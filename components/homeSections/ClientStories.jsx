const STORY = {
  logo: "/nayora.png",
  logoAlt: "Nayora logo",
  quote:
    "Syntrix understood our vision and turned it into a digital experience that truly reflects Nayora. Their creativity, attention to detail, and seamless execution gave our brand the online presence it deserved.",
  name: "Manish",
  role: "Founder, Nayora Corporations",
};

export default function ClientStories() {
  return (
    <section id="stories" className="client-stories">
      {/* Content stays inside the imaginary lines */}
      <div className="site-shell client-inner">
        <div className="client-topline">
          <span className="client-eyebrow">03 / Client Stories</span>
        </div>

        <div className="client-layout">
          <div className="client-logo">
            <img src={STORY.logo} alt={STORY.logoAlt} />
          </div>

          <figure className="client-story">
            <blockquote className="client-quote">
              &ldquo;{STORY.quote}&rdquo;
            </blockquote>

            <figcaption className="client-author">
              <span className="client-name">{STORY.name}</span>
              <span className="client-role">{STORY.role}</span>
            </figcaption>
          </figure>
        </div>
      </div>

      {/* Vector is full-bleed: edge to edge, flush on the bottom */}
      <img
        src="/vector.png"
        alt=""
        aria-hidden="true"
        className="client-vector"
      />
    </section>
  );
}