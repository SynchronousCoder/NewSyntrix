"use client";

import { useRef } from "react";
import "./Services.css";
import PageHeader from "../shared/PageHeader";
import RevealImage from "../animations/RevealImage";
import { useColorWave } from "../animations/useColorWave";
import WAVE_COLORS from "../animations/waveColors";

export default function ServicesIntro() {
  const titleRef = useRef(null);

  useColorWave(titleRef, {
    waveWidth: 4,
    secondsPerChar: 0.08,
    triggerMode: "idle",
    peakColor: WAVE_COLORS.services,
  });

  return (
    <section className="services-intro container">
      <div
        className="services-intro-art"
        role="img"
        aria-label="A quiet place to pause"
      >
        <RevealImage
          src="/cometakesit.png"
          alt="Come take a seat"
          fill
          style={{ objectFit: "cover" }}
          borderRadius="var(--radius-md)"
        />
      </div>

      <PageHeader
        ref={titleRef}
        className="services-intro-copy"
        label="/ Services"
        title={<>Our<br />Capabilities</>}
        description="Everything your brand needs to move forward; from strategic positioning and identity to digital experiences and growth."
      />
    </section>
  );
}
