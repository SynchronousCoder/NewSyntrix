"use client";

import { useRef } from "react";
import RevealImage from "../animations/RevealImage";
import PageHeader from "../shared/PageHeader";
import { useColorWave } from "../animations/useColorWave";
import WAVE_COLORS from "../animations/waveColors";

export default function AboutIntro() {
  const titleRef = useRef(null);

  useColorWave(titleRef, {
    waveWidth: 4,
    secondsPerChar: 0.08,
    triggerMode: "idle",
    peakColor: WAVE_COLORS.about,
  });

  return (
    <section className="editorial-hero" aria-labelledby="about-title">
      <div className="editorial-hero-media">
        <RevealImage
          src="/image/blueDoor.png.png"
          alt="A blue door standing in an open landscape"
          width={458}
          height={724}
          priority
        />
        <div className="editorial-image-fade" aria-hidden="true" />
      </div>
      <PageHeader
        ref={titleRef}
        className="editorial-hero-copy"
        label="/ About Us"
        title="Creativity Backed By Clarity."
        titleId="about-title"
        description="We're a creative agency driven by thoughtful design, meaningful ideas, and a genuine commitment to the brands and businesses we work with."
      />
      <div className="editorial-scroll">Scroll Down</div>
    </section>
  );
}
