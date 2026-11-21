# Global motion and page header investigation

Audit completed before implementation edits. Source references below are repository-relative and use the current line numbers.

## Confirmed root causes, ranked

1. **The global image registration is actually a three-frame allowlist.** `components/animations/MotionProvider.jsx:16-17,61-67` only picks `img` descendants of `.editorial-hero-media`, `.about-team`, and `.project-visual`. Home specializations and Services specialization/article content are therefore missed. Exclusions are only `[data-no-reveal]` and `RING_EXCLUSION` (`:14-15,62-66`); Footer and Home Client Stories are not explicitly excluded.
2. **Image setup violates the one-tween, stationary-frame, full-image contract.** `MotionProvider.jsx:104-145` sets visibility hidden, changes inline `y`, visibility, z-index and will-change, and sets up a paused tween plus a ScrollTrigger per image. Its start is measured once when `initialize` executes, although `invalidateOnRefresh` is attached to the tween rather than its trigger; the height fallback can be zero. The tween runs immediately for above-fold items after a 250ms timer (`:352-353`).
3. **Clipping is released only for frame selectors, not every clipping ancestor.** `MotionProvider.jsx:77-88,107-112` detects ancestors with non-visible overflow but releases only ancestors matching the three selectors. Required Home featured cards, editorial media and team frames stay clipped as the moving image exits. `.reveal-image` itself is overflow-visible (`motion.css:1-6`); the parent generally supplies cropping.
4. **Navigation does not reset scroll or ScrollTrigger state.** `MotionProvider.jsx:50-375` keys setup by `usePathname` and reverts its own GSAP context, but contains no `history.scrollRestoration`, `lenis.scrollTo`, `window.scrollTo`, or `ScrollTrigger.clearScrollMemory`. Lenis is created in a separate effect (`:22-48`) and is not accessible to the pathname effect. There are no other repository `scrollTo` or `scrollRestoration` calls. App Router `<Link>` normally manages navigation scroll; current code does not override it. Hash anchor exists on Contact as `href="#project-request"` (`app/contact/page.jsx:13`) and `/ #contact` links are present elsewhere, so hash intent needs preserving.
5. **The four headers are separate structures and CSS.** Projects uses `ProjectsIntro` / `.projects-intro-*` (`components/projects/ProjectsIntro.jsx`, `components/projects/Projects.css`); Services uses `ServicesIntro` / `.services-intro-*` (`components/services/ServicesIntro.jsx`, `components/services/Services.css`); About and Contact use `.editorial-hero-copy`, `.editorial-label`, `.editorial-title`, `.editorial-description` (`app/about/page.jsx:10-13`, `app/contact/page.jsx:10-13`, `components/pages/Editorial.css:1-10`). Editorial pages also place a large image in a separate grid column while Projects and Services do not. No common page-header component/class currently exists.
6. **Image and font readiness are not gating initialization.** `RevealImage.jsx:14-23,34-40` provides intrinsic width/height for normal images and a positioned fill image with frame-sized rendering; priority images are eager, others lazy (`:37-38`). Home featured `<img>` are lazy without intrinsic dimensions (`FeaturedProjects.jsx:23-27`), and other Home content images are plain img (`WhatWeDo.jsx:26-30`, `Specializations.jsx:42-45`). The provider starts after a fixed timer and refreshes on image load/font readiness (`MotionProvider.jsx:147-154,347-353`) but does not defer binding until natural/rendered dimensions exist. Lazy content outside the initial view may load after refresh.
7. **Hover transform conflicts with image transform.** Home project images have `transition: transform` and hover `scale(1.025)` (`components/home/FeaturedProjects.css:31-40`). Existing motion CSS suppresses transitions only on the three old frame types (`motion.css:23-26`). The stylesheet's `will-change` on `.reveal-text` is for text and is out of image scope (`motion.css:28-30`).
8. **More than one reveal system exists, but not a second image tween in the inspected app markup.** `RevealImage.jsx` only renders markup; it creates no GSAP effect. The provider creates an image tween and per-image trigger (`MotionProvider.jsx:119-145`), plus separate background-image clip-path reveals (`:157-184`) and SplitText/paragraph/label animation (`:186-339`). Those are independent and should remain. There is no explicit React mutation observer or other image tween found. `data-motionImageBound` guards repeated setup (`:74-76`), but setting it before the revealed check and cleanup deleting it makes lifecycle/order worth tightening.

## Registration inventory by page

| Page / content | Current registration | Intended status |
|---|---|---|
| Home Featured Projects (`FeaturedProjects.jsx:23-27`) | Registered because `.project-visual` is allowlisted | Animate |
| Home What We Do billboard (`WhatWeDo.jsx:25-31`) | Skipped: `.visual-placeholder` not allowlisted | Out of scope; preserve current behavior |
| Home Specializations image (`Specializations.jsx:40-46`) | Skipped: `.specializations-art` not allowlisted | Out of scope for this task's explicit image scope; preserve current behavior |
| Home Client Stories logos (`ClientStories.jsx:33-42`) | Skipped because no allowlisted frame, but not explicitly excluded | Exclude centrally; untouched |
| Home hero/ring/decorative imagery | Ring selector exclusion only where inside `.syntrix-hero` or `.hero-canvas`; no image list found in `HeroSection.jsx` | Preserve hero behavior and exclusions |
| Projects cards (`ProjectCard.jsx:8-12`, `Projects.css:33`) | Registered via `.project-visual`; `RevealImage` itself has no tween | Animate all actual project images |
| Services intro illustration | CSS background image (`Services.css:19`), background scanner can animate it | Preserve CSS background reveal |
| Services specialization/service blocks | `ServiceBlock.jsx:16-18` currently renders empty decorative placeholders, no content `<img>`; specialization CSS backgrounds are handled by the background scanner | Animate any actual content images; preserve background reveal |
| About editorial hero, team, manifesto images (`about/page.jsx:11,16-17`) | Hero and team registered by allowlist; manifesto image skipped because its parent has no allowlist class | Animate all three content images |
| Contact hero image (`contact/page.jsx:11`) | Registered by `.editorial-hero-media` | Animate |
| Shared ContactUs CTA artwork and Footer (`layout.tsx:48-49`) | Not in three-frame allowlist; no explicit exclusion | Exclude centrally; untouched |

## Clipping / transform ancestor table

This table lists confirmed ancestors from image markup and source CSS. “Clips moving image” describes the required upward travel before the image reaches its frame.

| Ancestor | File:line | Property | Clips moving image? | Needed at rest? |
|---|---|---|---|---|
| `.project-visual` (Home project image) | `components/home/FeaturedProjects.css:21-28` | `overflow:hidden`, `border-radius` | Yes | Yes, rounded object-fit card and hover crop |
| `.project-visual` (Projects cards) | `components/projects/Projects.css:33` | `overflow:hidden`, `border-radius` | Yes | Yes |
| `.editorial-hero-media` (About/Contact hero) | `components/pages/Editorial.css:2` | `overflow:hidden`, `border-radius` | Yes | Yes |
| `.about-team` | `components/pages/Editorial.css:13` | `overflow:hidden`, `border-radius` | Yes | Yes |
| `.reveal-image` wrapper | `components/animations/motion.css:1-6` | `overflow:visible`, no clip-path | No | Existing neutral wrapper |
| `.editorial-image-fade` overlay | `components/pages/Editorial.css:4` | backdrop-filter, mask-image | Does not clip the image; overlays lower portion | Yes, image fade design |
| `.visual-placeholder` (Home billboard, out of scope) | `components/home/WhatWeDo.css:32-36` | `overflow:hidden`, border-radius | Would clip | Yes; image remains untouched |
| `.specializations-art` (Home, out of scope) | `components/home/Specializations.css:11-18` | `overflow:hidden`, border-radius | Would clip | Yes; image remains untouched |
| `.client-stories` (logos, out of scope) | `components/home/ClientStories.css:5-7` | `overflow:hidden` | Would clip | Yes; section remains untouched |
| `.navbar` | `components/layout/Navbar/Navbar.css:6-16` | sticky, z-index 50; no overflow | No clipping; overlays if travel overlaps navbar | Must stay above dropping content |

Global `html` has smooth scroll and scroll-padding (`app/globals.css:101-104`); no global overflow-x clipping was found in the inspected source CSS. `motion.css:7-12` currently releases the three known image frames using `overflow:visible`, only temporarily by class.

## Header measurement status before implementation

Source inspection confirms different header DOM/CSS and intended content differences, but there is no browser automation dependency declared in `package.json`, and this investigation has not yet collected rendered `getBoundingClientRect()` or computed-style values. Those values are marked **NOT visually verified** until a real browser is available. Current CSS evidence: Projects heading rules `components/projects/Projects.css:24-31`; Services heading rules `components/services/Services.css:24-52`; editorial rules `components/pages/Editorial.css:1-10,61-67`. The selected reference for implementation will be Projects as instructed unless browser inspection establishes another clear intended baseline.

## Routing and lifecycle detail

- The root layout preserves `MotionProvider`, Navbar, route children, shared ContactUs and Footer (`app/layout.tsx:37-50`), so route pages swap under a persistent provider.
- `useGSAP` depends on `pathname` and uses `revertOnUpdate: true` (`MotionProvider.jsx:50-51,374-375`); cleanup reverts the local context and removes image listeners (`:354-372`). This should clean scoped animations but currently has no explicit route scroll reset or global ScrollTrigger memory clear.
- Lenis starts on mount unless reduced motion is preferred and syncs `ScrollTrigger.update` through its ticker (`:22-48`). It is destroyed on effect cleanup / reduced-motion change. No scroll-to call synchronizes browser and Lenis state today.
- Hash navigation: Contact's in-page link targets `#project-request` (`app/contact/page.jsx:13,15`); other page links may include `/#contact`. Any route reset must preserve hash targets.

## Home images intentionally left alone

The billboard image in What We Do, specialization artwork, Client Stories logos, Home hero/ring graphics, CSS background-image reveals, footer artwork, logos/icons, and decorative SVGs are not part of the requested Home Projects image scope. The central registration/exclusion mechanism will leave these unchanged.

## Implementation and verification report

### Changes made

- `components/animations/MotionProvider.jsx`: the image scan now requires `img[data-motion-image]`, skips central chrome/content exclusions, measures the rendered image or fill frame height in a function-based pixel offset, keeps one paused `fromTo` tween per image, and uses the stationary image frame for the one-shot trigger. The resting overflow clips the pre-positioned image until trigger entry. Overflow ancestors are released with `.is-image-dropping`; z-index, position, will-change, transforms, and classes are restored on completion and context cleanup. Image load/error, font readiness, and debounced resize refresh ScrollTrigger. Reduced-motion does not create a drop tween. Route cleanup is provided by the existing `useGSAP` `revertOnUpdate`; the route effect then sets manual history restoration, asks Lenis to move immediately, calls `window.scrollTo(0,0)`, clears ScrollTrigger memory, waits for the next route frame/eager image dimensions, builds triggers, and refreshes. A route hash is preserved and scrolled into view after initialization.
- `components/animations/RevealImage.jsx` and `components/home/FeaturedProjects.jsx`: add the opt-in marker to existing in-scope image markup. No animation was added to the component itself.
- `components/animations/motion.css`: temporarily makes only marked drop ancestors overflow-visible; frame clipping is restored when the tween completes. Existing image sizing and CSS-background/text systems remain.
- `components/shared/PageHeader.jsx`, `components/projects/ProjectsIntro.jsx`, `components/services/ServicesIntro.jsx`, `app/about/page.jsx`, `app/contact/page.jsx`, `components/pages/Editorial.css`, `components/projects/Projects.css`, and `components/services/Services.css`: use one shared label/title/description component and shared typography/reserved three-line title area. At mobile widths the header copy precedes the artwork so all four labels share the same page-top offset.

### Behavior choices and scope

- Easing: `expo.out`, selected for a quick start and a soft, smooth landing. Duration is 1.5s. The start is the negative rendered image height, or rendered frame height for a fill image; no fixed cap remains.
- Central image opt-in is `data-motion-image`; `RevealImage` adds it by default. Home Featured Projects opts in explicitly. Home What We Do, Home Specializations artwork, Client Stories, shared CTA and Footer images have no marker; central selectors additionally exclude Client Stories, Contact CTA, Footer, navbar, hero/ring and `[data-motion="off"]` / `[data-no-reveal]` regions.
- Existing CSS background-image reveal behavior remains a separate, unchanged tween path. It is not part of the content `<img>` registration.
- Back/forward is intentionally reset to top, consistent with the requested route contract. Hash routes retain their target.

### Verification outcome

- `npm run lint`: **exit 0**, 0 errors and 4 warnings. Warnings are the existing raw `<img>` use in Home Specializations, Home What We Do, and ProjectsIntro, plus the in-scope Home Featured Projects `<img>`.
- `npm run build`: Turbopack started but produced no progress after repeated bounded waits; it was stopped after no exit result. `npm run build -- --webpack`: compilation succeeded in 11.6s and TypeScript finished in 9.7s, then prerender failed on `/projects` with `EPERM: operation not permitted, mkdir '...\.next\server\app\projects.segments\projects'` while generating static pages (exit 1). This is the exact reported build failure; a successful production build is not verified.
- Real-browser verification: **NOT visually verified**. The desktop Computer Use attempt was stopped by the policy layer because it could not determine the browser URL confidently. No Playwright/Puppeteer package is installed. Consequently no animation frame samples, route-pair/back-forward trials, ScrollTrigger counts, reduced-motion check, scrollbar/flash/layout-shift check, or live header `getBoundingClientRect()` / computed-style tables were collected.
- Header “before” and “after” measurement tables at 1440, 1024, 768, and 390px remain **NOT visually verified**. Source structure and CSS have been unified, but the required zero-difference browser evidence is outstanding.
- The shared title reserves a third line on two-line Projects/Services titles. From the Projects reference CSS (`clamp(4.2rem, 7vw, 7rem)`, line-height `0.95`; mobile `clamp(3.5rem, 17vw, 5.5rem)`), the reserved extra line is calculated as 95.76px at 1440, 68.10px at 1024, 63.84px at 768, and 63.00px at 390. These are CSS formula calculations, **not browser measurements**.
- Other Home images, Footer, Client Stories, hover restoration, rounded clipping restoration, live image-type coverage (including fill/portrait/landscape), and all route transitions remain **NOT visually verified**.

| Page | Width | Before measurements | After measurements |
|---|---:|---|---|
| Projects | 1440 | NOT VISUALLY VERIFIED | NOT VISUALLY VERIFIED |
| Projects | 1024 | NOT VISUALLY VERIFIED | NOT VISUALLY VERIFIED |
| Projects | 768 | NOT VISUALLY VERIFIED | NOT VISUALLY VERIFIED |
| Projects | 390 | NOT VISUALLY VERIFIED | NOT VISUALLY VERIFIED |
| Services | 1440 | NOT VISUALLY VERIFIED | NOT VISUALLY VERIFIED |
| Services | 1024 | NOT VISUALLY VERIFIED | NOT VISUALLY VERIFIED |
| Services | 768 | NOT VISUALLY VERIFIED | NOT VISUALLY VERIFIED |
| Services | 390 | NOT VISUALLY VERIFIED | NOT VISUALLY VERIFIED |
| About Us | 1440 | NOT VISUALLY VERIFIED | NOT VISUALLY VERIFIED |
| About Us | 1024 | NOT VISUALLY VERIFIED | NOT VISUALLY VERIFIED |
| About Us | 768 | NOT VISUALLY VERIFIED | NOT VISUALLY VERIFIED |
| About Us | 390 | NOT VISUALLY VERIFIED | NOT VISUALLY VERIFIED |
| Contact | 1440 | NOT VISUALLY VERIFIED | NOT VISUALLY VERIFIED |
| Contact | 1024 | NOT VISUALLY VERIFIED | NOT VISUALLY VERIFIED |
| Contact | 768 | NOT VISUALLY VERIFIED | NOT VISUALLY VERIFIED |
| Contact | 390 | NOT VISUALLY VERIFIED | NOT VISUALLY VERIFIED |

The source-level implementation is in place, but the acceptance criteria that require real-browser evidence and a successful production build have not been demonstrated.
