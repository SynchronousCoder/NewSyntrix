"use client";

import { useRef } from "react";
import PageHeader from "../shared/PageHeader";
import { useImageReveal } from "../animations/useImageReveal";
import "./Projects.css";

export default function ProjectsIntro() {
  const artRef = useRef(null);

  useImageReveal(artRef, {
    borderRadius: "10px",
  });

  return (
    <section className="projects-intro container">
      <div className="projects-intro-art" ref={artRef}>
        <img
          data-motion="off"
          src="/proof.png"
          alt="Proof over promise"
          className="projects-intro-image"
        />
      </div>

      <PageHeader className="projects-intro-copy" label="/ Projects" title={<>Our<br />Work</>} description="Selected work across branding, digital experiences, and systems designed to move businesses forward." />
    </section>
  );
}
