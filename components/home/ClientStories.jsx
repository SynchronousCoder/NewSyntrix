import Image from "next/image";
import "./ClientStories.css";

const STORIES = [
  {
    id: "nayora",
    logo: "/nayora.png",
    logoAlt: "Nayora logo",
    logoSize: { width: 393, height: 131 },
    quote:
      "Syntrix understood our vision and turned it into a digital experience that truly reflects Nayora. Their creativity, attention to detail, and seamless execution gave our brand the online presence it deserved.",
    name: "Manish",
    role: "Founder, Nayora Corporations",
  },
  {
    id: "vacou",
    logo: "/image/VACOU.png",
    logoAlt: "VACOU logo",
    logoSize: { width: 501, height: 167 },
    quote:
      "Syntrix agency brought structure and clarity to our project. Communication was smooth, timelines were met, and the final results exceeded what we expected from a design partner.",
    name: "Max",
    role: "Founder, VACOU Restaurants",
  },
];

const [LIGHT_STORY, DARK_STORY] = STORIES;

function StoryRow({ story, className = "" }) {
  const { logo, logoAlt, logoSize, quote, name, role } = story;

  return (
    <div className={`client-layout ${className}`}>
      <div className="client-logo">
        <Image
          src={logo}
          alt={logoAlt}
          width={logoSize.width}
          height={logoSize.height}
          sizes="(max-width: 700px) 45vw, 26vw"
        />
      </div>

      <figure className="client-story">
        <blockquote className="client-quote">&ldquo;{quote}&rdquo;</blockquote>
        <figcaption className="client-author">
          <span className="client-name">{name}</span>
          <span className="client-role">{role}</span>
        </figcaption>
      </figure>
    </div>
  );
}

export default function ClientStories() {
  return (
    <section id="stories" className="client-stories">
      {/* Story 1: white background, inside the container lines */}
      <div className="site-shell client-inner">
        <div className="client-topline">
          <span className="client-eyebrow">03 / Client Stories</span>
        </div>
        <StoryRow story={LIGHT_STORY} className="client-layout--light" />
      </div>

      {/* Story 2: sits on the black vector, white text */}
      <div className="client-dark" aria-label="Second client testimonial">
        <svg
          className="client-vector"
          viewBox="0 0 1465 379"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M0 30 C90 8 190 0 320 8 C520 22 700 70 900 105 C1120 143 1300 150 1465 160 L1465 379 L0 379 Z"
            fill="currentColor"
          />
        </svg>

        <div className="site-shell client-dark-inner">
          <StoryRow story={DARK_STORY} />
        </div>
      </div>
    </section>
  );
}