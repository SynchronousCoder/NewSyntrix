"use client";

import { useRef } from "react";
import { useImageReveal } from "../animations/useImageReveal";
import "./WhatWeDo.css";

export default function WhatWeDo() {
  const visualRef = useRef(null);

  // Apply centralized reveal image animation to the billboard image wrapper (border-radius: 10px)
  useImageReveal(visualRef, {
    borderRadius: "10px",
  });

  return (
    <section id="about" className="section site-shell">
      <div className="section-topline"></div>

      <h1 className="intro-statement" data-no-reveal>
        Syntrix is the digital partner that turns your brand&apos;s potential
        into progress. We bring strategy, design, and technology together to
        build websites that move your business forward.
      </h1>

      <div className="what-we-do-grid">
        <div className="what-wedo-para1">
          <span className="eyebrow">01 / What we do</span>
          <p className="body-copy">
            Through strategic thinking, purposeful design and precision
            development, we build websites that earn attention, turn visitors
            into opportunities, and give ambitious businesses a sharper digital
            edge.
          </p>
        </div>

        <div className="visual-placeholder" ref={visualRef}>
          <img
            data-motion="off"
            src="/BillboardBranding.png"
            alt="Syntrix billboard branding campaign"
            className="billboard-image"
          />
          <div className="billboard-bottom-blur" />
        </div>
      </div>
    </section>
  );
}
