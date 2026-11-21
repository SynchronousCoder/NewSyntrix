import Link from "next/link";
import RevealImage from "../animations/RevealImage";
import "./Projects.css";

export default function ProjectCard({ project }) {
  return (
    <article className="project-card" id={project.name === "Simplify" ? "simplify" : undefined}>
      <Link href={project.href} aria-label={`View ${project.name} project`}>
        <div className="project-visual">
          {project.image ? <RevealImage src={project.image} alt={project.imageAlt} fill sizes="(max-width: 700px) 100vw, 50vw" /> : <span className="project-placeholder-label">Project image</span>}
        </div>
        <div className="project-caption"><span>{project.name}</span><span>{project.category}</span></div>
      </Link>
      <div className="project-tags" aria-label={`${project.name} categories`}>
        {project.tags.map((tag) => <span className="project-tag" key={tag}>{tag}</span>)}
      </div>
    </article>
  );
}
