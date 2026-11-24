"use client";

import { useLayoutEffect, useRef } from "react";
import { animateRevealImage } from "./useImageReveal";

export default function RevealImage({
  src,
  alt,
  className = "",
  priority = false,
  width,
  height,
  fill = false,
  style,
  borderRadius,
  ...props
}) {
  const wrapperRef = useRef(null);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const ctx = animateRevealImage(wrapper, {
      borderRadius,
    });

    return () => ctx.revert();
  }, [borderRadius]);

  const imageStyle = fill
    ? {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        ...style,
      }
    : style;

  return (
    <span
      ref={wrapperRef}
      className={`reveal-image ${className}`}
      data-reveal-image
      data-motion="off"
      style={fill ? { position: "absolute", inset: 0 } : undefined}
    >
      {/* Keep the existing remote project image sources working without Next image host configuration. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        style={imageStyle}
        {...props}
      />
    </span>
  );
}
