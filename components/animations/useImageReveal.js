"use client";

import { useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "./gsapSetup";

/**
 * Standard configuration for reveal image animation across SYNTRIX.
 * Change values here to update every image on the site.
 */
export const REVEAL_IMAGE_CONFIG = {
  start: "top 67.5%",
  duration: 1.7,
  ease: "expo.out",
  scaleInnerImg: true,
  scaleFrom: 1.08,
  scaleTo: 1,
};

/* Remove undefined values so they never overwrite the defaults */
function cleanConfig(custom = {}) {
  const out = {};
  Object.keys(custom).forEach((key) => {
    if (custom[key] !== undefined) out[key] = custom[key];
  });
  return out;
}

/**
 * Attaches the centralized reveal image animation to one or more wrappers.
 *
 * @param {HTMLElement|HTMLElement[]|NodeList} targets - image wrapper element(s)
 * @param {Object} customConfig - optional overrides for REVEAL_IMAGE_CONFIG
 * @returns {gsap.Context} - call ctx.revert() to clean up
 */
export function animateRevealImage(targets, customConfig = {}) {
  const config = { ...REVEAL_IMAGE_CONFIG, ...cleanConfig(customConfig) };
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const elements =
    targets instanceof NodeList || Array.isArray(targets)
      ? Array.from(targets)
      : [targets].filter(Boolean);

  const ctx = gsap.context(() => {
    elements.forEach((wrapper) => {
      if (!wrapper) return;

      // Reduced motion: leave the image in its final state
      if (reduceMotion) return;

      const computedRadius =
        config.borderRadius || getComputedStyle(wrapper).borderRadius || "";
      const hasRadius = computedRadius && computedRadius !== "0px";
      const roundStr = hasRadius ? ` round ${computedRadius}` : "";

      const initialClip = `inset(0% 0% 100% 0%${roundStr})`;
      const finalClip = `inset(0% 0% 0% 0%${roundStr})`;

      const img = wrapper.querySelector("img");

      // Hide the image before the trigger so it never flashes at full size
      gsap.set(wrapper, { clipPath: initialClip });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: config.start,
          once: true,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        wrapper,
        { clipPath: initialClip },
        {
          clipPath: finalClip,
          duration: config.duration,
          ease: config.ease,
          clearProps: "clipPath",
        },
        0,
      );

      if (config.scaleInnerImg && img) {
        tl.fromTo(
          img,
          { scale: config.scaleFrom },
          {
            scale: config.scaleTo,
            duration: config.duration,
            ease: config.ease,
            clearProps: "scale",
          },
          0,
        );
      }

      // Lazy images change the layout when they load: remeasure trigger positions
      if (img && !img.complete) {
        img.addEventListener("load", () => ScrollTrigger.refresh(), {
          once: true,
        });
      }
    });
  });

  return ctx;
}

/**
 * useImageReveal hook.
 *
 * @param {React.RefObject} containerRef - ref to the wrapper, or to a parent container
 * @param {Object} options - { selector, borderRadius, start, duration, ease, scaleInnerImg }
 *   selector: if set, every match inside containerRef is animated
 */
export function useImageReveal(containerRef, options = {}) {
  const { selector, borderRadius, start, duration, ease, scaleInnerImg } =
    options;

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const wrappers = selector ? container.querySelectorAll(selector) : container;

    const ctx = animateRevealImage(wrappers, {
      borderRadius,
      start,
      duration,
      ease,
      scaleInnerImg,
    });

    return () => ctx.revert();
  }, [containerRef, selector, borderRadius, start, duration, ease, scaleInnerImg]);
}