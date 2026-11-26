"use client";

import { useRef } from "react";
import PageHeader from "../shared/PageHeader";
import { useImageReveal } from "../animations/useImageReveal";
import { useColorWave } from "../animations/useColorWave";
import WAVE_COLORS from "../animations/waveColors";
import "../pages/Editorial.css";
import "./Projects.css";

export default function ProjectsIntro() {
  const artRef = useRef(null);
  const titleRef = useRef(null);

  useImageReveal(artRef, {
    borderRadius: "10px",
  });

  useColorWave(titleRef, {
    waveWidth: 4,
    secondsPerChar: 0.08,
    triggerMode: "idle",
    peakColor: WAVE_COLORS.projects,
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

      <PageHeader
        ref={titleRef}
        className="projects-intro-copy"
        label="/ Projects"
        title={<>Our<br />Work</>}
        description="Selected work across branding, digital experiences, and systems designed to move businesses forward."
      />
    </section>
  );
}
