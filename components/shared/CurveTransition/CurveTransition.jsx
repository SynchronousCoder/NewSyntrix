import "./CurveTransition.css";

export default function CurveTransition() {
  return (
    <div className="curve-transition-bleed" aria-hidden="true">
      <svg
        className="curve-transition"
        viewBox="0 0 1465 379"
        preserveAspectRatio="none"
        focusable="false"
      >
        <path
          d="M0 0 C210 0 395 24 635 78 C936 146 1204 277 1465 379 L1465 379 L0 379 Z"
          fill="var(--color-dark)"
        />
      </svg>
    </div>
  );
}
