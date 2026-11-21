import "./Services.css";
import PageHeader from "../shared/PageHeader";

export default function ServicesIntro() {
  return (
    <section className="services-intro container">
      <div
        className="services-intro-art"
        role="img"
        aria-label="A quiet place to pause"
      >
        <span className="motion-background-layer" aria-hidden="true" />
      </div>

      <PageHeader className="services-intro-copy" label="/ Services" title={<>Our<br />Capabilities</>} description="Everything your brand needs to move forward; from strategic positioning and identity to digital experiences and growth." />
    </section>
  );
}
