"use client";

import { useState } from "react";
import "./Footer.css";

const EMAIL = "wesyntrix@gmail.com";

export default function CopyMailCard() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { setCopied(false); }
  };

  return (
    <div className="footer-card footer-card--light">
      <span>
        <span className="footer-card-label">/ {copied ? "Copied to clipboard" : "Copy mail"}</span>
        <span className="footer-card-title">Prefer mail?</span>
      </span>

      <span className="footer-card-action">
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        <button type="button" onClick={copy} aria-label={`Copy ${EMAIL}`}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9.5" />
          <path d="M8.5 12h7M12.5 8.5 16 12l-3.5 3.5" />
        </svg></button>
      </span>
    </div>
  );
}
