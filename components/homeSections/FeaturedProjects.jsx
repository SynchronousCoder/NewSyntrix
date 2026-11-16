import Link from "next/link";
import { projects } from "../../data/projects";

export default function FeaturedProjects() {
  return (
    <section id="work" className="section site-shell">
      <div className="section-topline projects-heading">
        <h2 className="section-title">Featured Projects</h2>
        <Link className="text-link" href="/work">
          View More ↗ 
        </Link>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.name}>
            <Link href={project.href} aria-label={`View ${project.name} project`}>
              <div className="project-visual">
                {project.image ? (
                  // Use a regular img for now; replace with next/image when real assets are in place.
                  <img src={project.image} alt={project.imageAlt} loading="lazy" />
                ) : (
                  <span className="project-placeholder-label">Project image</span>
                )}
              </div>
              <div className="project-caption">
                <span>{project.name}</span>
                <span>{project.category}</span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
