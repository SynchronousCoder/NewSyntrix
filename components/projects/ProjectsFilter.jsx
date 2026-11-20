"use client";

import { useState } from "react";
import { projects } from "../../data/projects";
import ProjectCard from "./ProjectCard";
import "./Projects.css";

const FILTERS = ["All", "Branding", "Website", "Marketing"];

export default function ProjectsFilter() {
  const [active, setActive] = useState("All");
  const visibleProjects = active === "All" ? projects : projects.filter((project) => project.tags.includes(active));

  return (
    <section className="projects-gallery container" aria-label="Selected projects">
      <div className="projects-filters" role="group" aria-label="Filter projects">
        {FILTERS.map((filter) => (
          <button key={filter} type="button" aria-pressed={active === filter} className={active === filter ? "is-active" : ""} onClick={() => setActive(filter)}>
            {filter}
          </button>
        ))}
      </div>
      <div className="projects-grid">
        {visibleProjects.map((project) => <ProjectCard key={project.name} project={project} />)}
      </div>
    </section>
  );
}
