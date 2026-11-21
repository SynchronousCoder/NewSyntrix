"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "./gsapSetup";
import "lenis/dist/lenis.css";

const REVEAL_EASE = "expo.out";
const TEXT_HEADINGS = "h1, h2, h3, h4, h5, h6";
const TEXT_PARAGRAPHS = "p";
const TEXT_LABELS =
  ".page-header-label, .eyebrow, .editorial-label, .services-eyebrow, .projects-eyebrow, .contact-eyebrow, .client-eyebrow, .service-topline > span";
const RING_EXCLUSION =
  ".syntrix-hero, .hero-canvas, [data-no-reveal], nextjs-portal";
const IMAGE_EXCLUSIONS =
  ".client-stories, .footer, .navbar, .contact, .syntrix-hero, .hero-canvas, [data-motion=\"off\"], [data-no-reveal], nextjs-portal";

export default function MotionProvider() {
  const pathname = usePathname();
  const lenisRef = useRef(null);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis;
    let tick;
    const stop = () => {
      if (!lenis) return;
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenis = undefined;
      lenisRef.current = null;
    };
    const start = () => {
      if (preference.matches || lenis) return;
      lenis = new Lenis({ lerp: 0.09, smoothWheel: true, syncTouch: false });
      lenisRef.current = lenis;
      tick = (time) => lenis?.raf(time * 1000);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    };
    const onPreferenceChange = () => (preference.matches ? stop() : start());
    start();
    preference.addEventListener("change", onPreferenceChange);
    return () => {
      preference.removeEventListener("change", onPreferenceChange);
      stop();
    };
  }, []);

  useGSAP(
    () => {
      let active = true;
      let context;
      const imageListeners = [];
      const splitInstances = [];
      const originalImageStyles = new Map();
      const refresh = () => ScrollTrigger.refresh();
      let refreshTimer;
      const onResize = () => {
        window.clearTimeout(refreshTimer);
        refreshTimer = window.setTimeout(() => {
          if (active) refresh();
        }, 120);
      };
      const initialize = () => {
        if (!active) return;
        const imageNodes = [...document.querySelectorAll("img[data-motion-image]")]
          .filter((image) => !image.closest(IMAGE_EXCLUSIONS));

        context = gsap.context(() => {
          const media = gsap.matchMedia();
          media.add("(prefers-reduced-motion: no-preference)", () => {
            imageNodes.forEach((image) => {
              const frame = image.closest("[data-reveal-image]") || image.parentElement;
              if (!frame || image.dataset.motionImageBound === "true" || image.dataset.motionRevealed === "true") return;
              const rect = image.getBoundingClientRect();
              const frameRect = frame.getBoundingClientRect();
              if (!(rect.height || frameRect.height)) return;
              image.dataset.motionImageBound = "true";
              const clippingFrames = [];
              let ancestor = image.parentElement;
              while (ancestor && ancestor !== document.body) {
                const style = getComputedStyle(ancestor);
                if (style.overflowX !== "visible" || style.overflowY !== "visible") {
                  clippingFrames.push(ancestor);
                }
                ancestor = ancestor.parentElement;
              }
              const releaseFrames = clippingFrames;
              const isAboveFold =
                frame.getBoundingClientRect().top < window.innerHeight * 0.85;
              const inlineZIndex = image.style.zIndex;
              const inlineWillChange = image.style.willChange;
              const inlinePosition = image.style.position;
              originalImageStyles.set(image, {
                inlineZIndex,
                inlineWillChange,
                inlinePosition,
                releaseFrames,
              });
              const startY = () => {
                const imageHeight = image.getBoundingClientRect().height;
                return -(imageHeight || frame.getBoundingClientRect().height);
              };
              const restoreFrameStyles = () =>
                releaseFrames.forEach((node) => node.classList.remove("is-image-dropping"));
              let tween;
              let triggerEntered = false;
              let hasStarted = false;
              const startWhenReady = () => {
                if (image.complete) beginDrop();
              };
              const beginDrop = () => {
                if (hasStarted) return;
                hasStarted = true;
                releaseFrames.forEach((node) => node.classList.add("is-image-dropping"));
                tween.play(0);
              };
              // The resting frame clips the pre-positioned image until its trigger fires.
              gsap.set(image, { y: startY() });
              image.style.willChange = "transform";
              image.style.zIndex = "2";
              if (getComputedStyle(image).position === "static") image.style.position = "relative";
              tween = gsap.fromTo(image, {
                y: startY,
              }, {
                y: 0,
                duration: 1.5,
                ease: "expo.out",
                overwrite: "auto",
                clearProps: "transform",
                onComplete: () => {
                  image.dataset.motionRevealed = "true";
                  image.style.zIndex = inlineZIndex;
                  image.style.willChange = inlineWillChange;
                  image.style.position = inlinePosition;
                  restoreFrameStyles();
                },
                paused: true,
                immediateRender: false,
              });
              if (isAboveFold) startWhenReady();
              else {
                ScrollTrigger.create({
                  trigger: frame,
                  start: "top 85%",
                  once: true,
                  invalidateOnRefresh: true,
                  onRefresh: () => {
                    if (!hasStarted) {
                      tween.invalidate();
                      gsap.set(image, { y: startY() });
                    }
                  },
                  onEnter: () => {
                    triggerEntered = true;
                    startWhenReady();
                  },
                });
              }

              if (!imageListeners.some(([target]) => target === image)) {
                const onImageLoad = () => {
                  if (triggerEntered || isAboveFold) startWhenReady();
                  window.clearTimeout(refreshTimer);
                  refreshTimer = window.setTimeout(() => {
                    if (active) refresh();
                  }, 100);
                };
                image.addEventListener("load", onImageLoad);
                image.addEventListener("error", onImageLoad);
                imageListeners.push([image, onImageLoad]);
              }
            });

            const backgroundNodes = [
              ...document.querySelectorAll("body *"),
            ].filter((node) => {
              if (node.closest(RING_EXCLUSION) || node.closest(IMAGE_EXCLUSIONS)) return false;
              return getComputedStyle(node).backgroundImage.includes("url(");
            });
            backgroundNodes.forEach((node) => {
              if (node.dataset.motionRevealed === "true") return;
              gsap.fromTo(
                node,
                { clipPath: "inset(100% 0% 0% 0%)", yPercent: 100 },
                {
                  clipPath: "inset(0% 0% 0% 0%)",
                  yPercent: 0,
                  duration: 1.55,
                  ease: REVEAL_EASE,
                  clearProps: "transform",
                  onComplete: () => {
                    node.dataset.motionRevealed = "true";
                  },
                  scrollTrigger: {
                    trigger: node,
                    start: "top 85%",
                    once: true,
                  },
                },
              );
            });

            const excludedText = `${RING_EXCLUSION}, ${IMAGE_EXCLUSIONS}, [hidden], [aria-hidden="true"]`;
            const headingNodes = [
              ...document.querySelectorAll(TEXT_HEADINGS),
            ].filter(
              (node) =>
                !node.closest(excludedText) &&
                !node.closest("[data-no-reveal]"),
            );
            headingNodes.forEach((node) => {
              const finalColor = getComputedStyle(node).color;
              const heroHeading = node.closest(
                ".editorial-hero-copy, .services-intro-copy, .projects-intro-copy",
              );
              const split = new SplitText(node, {
                type: "lines,chars",
                mask: "lines",
                linesClass: "motion-line-mask",
                aria: "auto",
                autoSplit: true,
                onSplit: (instance) => {
                  instance.lines.forEach((line) => {
                    line.style.overflow = "hidden";
                  });
                  const completed = node.dataset.motionRevealed === "true";
                  const timeline = gsap.timeline({
                    delay: completed
                      ? 0
                      : heroHeading
                        ? Number(node.dataset.revealDelay || 0.45)
                        : Number(node.dataset.revealDelay || 0),
                    scrollTrigger:
                      completed ||
                      node.getBoundingClientRect().top <
                        window.innerHeight * 0.85
                        ? undefined
                        : { trigger: node, start: "top 85%", once: true },
                    onComplete: () => {
                      node.dataset.motionRevealed = "true";
                    },
                  });
                  timeline.fromTo(
                    instance.lines,
                    { yPercent: 100 },
                    {
                      yPercent: 0,
                      duration: 1.2,
                      stagger: 0.08,
                      ease: REVEAL_EASE,
                    },
                    0,
                  );
                  timeline.fromTo(
                    instance.chars,
                    { color: "rgba(255, 239, 144, 0)", opacity: 0 },
                    {
                      color: finalColor,
                      opacity: 1,
                      duration: 0.45,
                      stagger: 0.025,
                      ease: "power1.out",
                    },
                    0.04,
                  );
                  if (completed) timeline.progress(1);
                  return timeline;
                },
              });
              splitInstances.push(split);
            });

            const paragraphNodes = [
              ...document.querySelectorAll(TEXT_PARAGRAPHS),
            ].filter(
              (node) =>
                !node.closest(excludedText) &&
                !node.closest("[data-no-reveal]"),
            );
            paragraphNodes.forEach((node) => {
              const heroText = node.closest(
                ".editorial-hero-copy, .services-intro-copy, .projects-intro-copy",
              );
              const split = new SplitText(node, {
                type: "lines",
                mask: "lines",
                linesClass: "motion-line-mask",
                aria: "auto",
                autoSplit: true,
                onSplit: (instance) => {
                  instance.lines.forEach((line) => {
                    line.style.overflow = "hidden";
                  });
                  const completed = node.dataset.motionRevealed === "true";
                  const timeline = gsap.timeline({
                    delay: completed
                      ? 0
                      : heroText
                        ? Math.max(1.85, Number(node.dataset.revealDelay || 0))
                        : Number(node.dataset.revealDelay || 0),
                    scrollTrigger:
                      completed ||
                      node.getBoundingClientRect().top <
                        window.innerHeight * 0.85
                        ? undefined
                        : { trigger: node, start: "top 85%", once: true },
                    onComplete: () => {
                      node.dataset.motionRevealed = "true";
                    },
                  });
                  timeline.fromTo(
                    instance.lines,
                    { yPercent: 100, opacity: 0 },
                    {
                      yPercent: 0,
                      opacity: 1,
                      duration: 1,
                      stagger: 0.08,
                      ease: REVEAL_EASE,
                    },
                  );
                  if (completed) timeline.progress(1);
                  return timeline;
                },
              });
              splitInstances.push(split);
            });

            const labelNodes = [
              ...document.querySelectorAll(TEXT_LABELS),
            ].filter(
              (node) =>
                !node.closest(excludedText) &&
                !node.closest("[data-no-reveal]"),
            );
            labelNodes.forEach((node) => {
              if (node.dataset.motionRevealed === "true") return;
              gsap.fromTo(
                node,
                { y: 16, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.55,
                  ease: REVEAL_EASE,
                  clearProps: "transform,opacity",
                  onComplete: () => {
                    node.dataset.motionRevealed = "true";
                  },
                  scrollTrigger:
                    node.getBoundingClientRect().top < window.innerHeight * 0.85
                      ? undefined
                      : { trigger: node, start: "top 85%", once: true },
                },
              );
            });
            return () =>
              splitInstances.forEach((split) => {
                if (split.isSplit) split.revert();
              });
          });
        }, document.body);

        document.fonts?.ready?.then(() => {
          if (active) refresh();
        });
        window.addEventListener("load", refresh, { once: true });
        window.addEventListener("resize", onResize);
      };
      const routeHash = window.location.hash;
      const resetRouteScroll = () => {
        history.scrollRestoration = "manual";
        if (!routeHash) {
          lenisRef.current?.scrollTo(0, { immediate: true, force: true });
          window.scrollTo(0, 0);
        }
        ScrollTrigger.clearScrollMemory("manual");
      };
      resetRouteScroll();
      // Wait for the new route's content and image dimensions before creating triggers.
      const initializeWhenReady = async () => {
        await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        const pendingImages = [...document.querySelectorAll("img[data-motion-image]")]
          .filter((image) => !image.closest(IMAGE_EXCLUSIONS) && !image.complete && image.loading === "eager");
        await Promise.all(pendingImages.map((image) => new Promise((resolve) => {
          image.addEventListener("load", resolve, { once: true });
          image.addEventListener("error", resolve, { once: true });
        })));
        if (!active) return;
        initialize();
        if (routeHash) {
          const target = document.getElementById(decodeURIComponent(routeHash.slice(1)));
          if (target && lenisRef.current) {
            lenisRef.current.scrollTo(target, { immediate: true, force: true });
          } else {
            target?.scrollIntoView({ block: "start" });
          }
        }
      };
      initializeWhenReady();
      return () => {
        active = false;
        context?.revert();
        imageListeners.forEach(([image, listener]) => {
          image.removeEventListener("load", listener);
          image.removeEventListener("error", listener);
        });
        originalImageStyles.forEach((style, image) => {
          gsap.set(image, { clearProps: "transform" });
          image.style.zIndex = style.inlineZIndex;
          image.style.willChange = style.inlineWillChange;
          image.style.position = style.inlinePosition;
          style.releaseFrames.forEach((node) =>
            node.classList.remove("is-image-dropping"),
          );
          delete image.dataset.motionImageBound;
        });
        window.clearTimeout(refreshTimer);
        window.removeEventListener("load", refresh);
        window.removeEventListener("resize", onResize);
      };
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
