"use client";

import { forwardRef } from "react";
import "../pages/Editorial.css";

/**
 * Shared copy block keeps the four interior page headers on one baseline.
 *
 * Label and description render instantly (no animation, no RevealText).
 * The h1 carries data-no-reveal so the global MotionProvider text reveal
 * leaves it alone — the colour wave (useColorWave) is applied per-page via
 * the forwarded ref.
 */
const PageHeader = forwardRef(function PageHeader(
  { label, title, description, titleId, className = "", descriptionClassName = "" },
  ref,
) {
  return (
    <div className={`page-header ${className}`} data-no-reveal>
      <span className="page-header-label" data-no-reveal>
        {label}
      </span>
      <h1
        ref={ref}
        id={titleId}
        className="page-header-title"
        data-no-reveal
        data-final-color="#111111"
      >
        {title}
      </h1>
      <p
        className={`page-header-description ${descriptionClassName}`}
        data-no-reveal
      >
        {description}
      </p>
    </div>
  );
});

export default PageHeader;
