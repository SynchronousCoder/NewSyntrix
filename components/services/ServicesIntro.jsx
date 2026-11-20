import "./Services.css";

export default function ServicesIntro() {
  return (
    <section className="services-intro container">
      <div
        className="services-intro-art"
        role="img"
        aria-label="A quiet place to pause"
      />

      <div className="services-intro-copy">
        <span className="services-eyebrow">/ Services</span>
        <h1 className="services-intro-title">
          Our
          <br />
          Capabilities
        </h1>
        <p className="services-intro-text">
          Everything your brand needs to move forward;
          <br className="services-desktop-break" /> from strategic positioning
          and identity to
          <br className="services-desktop-break" /> digital experiences and
          growth.
        </p>
      </div>
    </section>
  );
}