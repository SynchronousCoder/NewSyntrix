
import "./Projects.css";
import PageHeader from "../shared/PageHeader";

export default function ProjectsIntro() {
  return (
    <section className="projects-intro container">
      <div className="projects-intro-art">
        <img
          src="/proof.png"
          alt="Proof over promise"
          className="projects-intro-image"
        />
      </div>

      <PageHeader className="projects-intro-copy" label="/ Projects" title={<>Our<br />Work</>} description="Selected work across branding, digital experiences, and systems designed to move businesses forward." />
    </section>
  );
}
