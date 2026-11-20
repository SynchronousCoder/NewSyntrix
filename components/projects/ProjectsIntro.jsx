import "./Projects.css";

export default function ProjectsIntro() {
  return (
    <section className="projects-intro container">
      <div className="projects-intro-art" aria-label="Proof over promise" role="img">
        <span>✳</span>
        <strong>PROOF OVER<br />PROMISE.</strong>
      </div>
      <div className="projects-intro-copy">
        <span className="projects-eyebrow">/ Projects</span>
        <h1>Our<br />Work</h1>
        <p>Selected work across branding, digital<br className="projects-desktop-break" /> experiences, and systems designed<br className="projects-desktop-break" /> to move businesses forward.</p>
      </div>
    </section>
  );
}
