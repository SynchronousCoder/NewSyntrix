"use client";

import Link from "next/link";
import { useRef } from "react";
import { projects } from "../../data/projects";
import { useImageReveal } from "../animations/useImageReveal";
import { useColorWave } from "../animations/useColorWave";
import "./FeaturedProjects.css";
import RevealImage from "../animations/RevealImage";

/* Home shows only the first 4; /projects shows all of them */
const FEATURED_COUNT = 4;
const featuredProjects = projects.slice(0, FEATURED_COUNT);

export default function FeaturedProjects() {
  const containerRef = useRef(null);
  const headingRef = useRef(null);

  // Centralized hook for reveal image animation across all 4 project image wrappers
  useImageReveal(containerRef, {
    selector: ".project-visual",
    borderRadius: "4px",
  });

  // Shared hook for colour wave on the 2-line heading
  useColorWave(headingRef, {
    waveWidth: 4,
    secondsPerChar: 0.09,
    triggerMode: "scroll",
    scrollStart: "top 85%",
  });

  return (
    <section id="work" ref={containerRef} className="section site-shell">
      <div className="section-topline projects-heading">
        <h2
          ref={headingRef}
          className="section-title projects-section-title"
          data-no-reveal
          data-final-color="#000000"
        >
          Featured
          <br />
          Projects
        </h2>
        <Link className="text-link" href="/projects">
          View More ↗
        </Link>
      </div>

      <div className="projects-grid">
        {featuredProjects.map((project) => (
          <article className="project-card" key={project.name}>
            <Link
              href={project.href}
              aria-label={`View ${project.name} project`}
            >
              <div className="project-visual">
                {project.image ? (
                  <RevealImage
                    src={project.image}
                    alt={project.imageAlt}
                    borderRadius="4px"
                    loading="lazy"
                  />
                ) : (
                  <span className="project-placeholder-label">
                    Project image
                  </span>
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
