"use client";

export default function RevealText({ as: Tag = "div", children, className = "", delay = 0, ...props }) {
  return <Tag className={`reveal-text ${className}`} data-reveal-delay={delay || undefined} {...props}>{children}</Tag>;
}
