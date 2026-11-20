
"use client";

import { useState } from "react";
import Link from "next/link";
import "./Specializations.css";

const specializations = [
  {
    title: "Strategy",
    description:
      "Research, positioning and roadmaps that help you navigate with confidence.",
  },
  {
    title: "Design",
    description:
      "Distinctive digital experiences shaped around your brand, audience and goals.",
  },
  {
    title: "Development",
    description:
      "Fast, accessible and maintainable websites built with a solid technical foundation.",
  },
  {
    title: "Marketing",
    description:
      "Search-focused foundations and digital campaigns designed to grow qualified attention.",
  },
];

export default function Specializations() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="services" className="section site-shell">
      <div className="section-topline">
        <span className="eyebrow">02 / WE SPECIALISE IN</span>
      </div>

      <div className="specializations-layout">
        <div className="specializations-art">
          <img
            src="/calculator.png"
            alt="Syntrix creative concept visual"
          />
        </div>

        <div className="specializations-content">
          <div className="specializations-list">
            {specializations.map((item, index) => {
              const isOpen = openIndex === index;
              const panelId = `specialization-panel-${index}`;

              return (
                <div
                  className="specialization-item"
                  key={item.title}
                >
                  <button
                    className="specialization-trigger"
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() =>
                      setOpenIndex(isOpen ? -1 : index)
                    }
                  >
                    <span>{item.title}</span>

                    <span
                      className="specialization-symbol"
                      aria-hidden="true"
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  <div
                    className="specialization-panel"
                    id={panelId}
                    hidden={!isOpen}
                  >
                    <p className="specialization-detail">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <Link href="/services" className="view-services">
            <span>View Services</span>

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M8 12h8" />
              <path d="m12 8 4 4-4 4" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
