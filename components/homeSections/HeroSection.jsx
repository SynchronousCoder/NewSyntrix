"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* Three.js loads after the title has painted, so the page feels instant */
const HeroRing = dynamic(() => import("./HeroRing"), { ssr: false });

export default function HeroSection() {
  const heroRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  /* Stop rendering WebGL when the hero is scrolled out of view */
  useEffect(() => {
    const node = heroRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const frameloop = reducedMotion ? "demand" : inView ? "always" : "never";

  return (
    <section
      ref={heroRef}
      className="syntrix-hero"
      aria-label="Syntrix introduction"
    >
      <div className="hero-stage">
        <HeroRing side="back" frameloop={frameloop} reducedMotion={reducedMotion} />

        <div className="hero-title-layer">
          <div className="hero-title-fit">
            <h1 className="hero-title">SYNTRIX</h1>
          </div>
        </div>

        <HeroRing side="front" frameloop={frameloop} reducedMotion={reducedMotion} />
      </div>

      <div className="hero-bottom container">
        <p className="hero-subheading">
          We partner with ambitious brands to create distinctive digital
          experiences through bold design, purposeful animation, and precision
          development built to captivate audiences and move businesses forward.
        </p>

        <Link href="/contact" className="hero-cta">
          <svg
            className="hero-cta-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9.5" />
            <path d="M8.5 12h7M12.5 8.5 16 12l-3.5 3.5" />
          </svg>
          <span>Start A Project</span>
        </Link>
      </div>
    </section>
  );
}