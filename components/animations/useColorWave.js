import { useLayoutEffect } from "react";
import SplitType from "split-type";
import { gsap } from "./gsapSetup";

/**
 * useColorWave hook
 * Extracts the single linear tween moving a wave front across characters.
 * Staggers color from starting grey rgb(217, 217, 217) -> bright lime #DFFF00 -> final computed color.
 *
 * @param {React.RefObject} titleRef - ref to the heading element
 * @param {Object} options - config options
 * @param {number} options.waveWidth - character spread / wave width factor (default ~4)
 * @param {number} options.secondsPerChar - time per char in the wave (default ~0.08)
 * @param {string} options.triggerMode - "idle" (e.g. for hero) or "scroll" (via ScrollTrigger)
 * @param {string} options.scrollStart - ScrollTrigger start position if triggerMode === "scroll" (default "top 85%")
 * @param {Function} options.onComplete - callback when wave finishes (e.g. to reveal hero ring)
 */
export function useColorWave(titleRef, options = {}) {
  const {
    waveWidth = 4,
    secondsPerChar = 0.08,
    triggerMode = "idle",
    scrollStart = "top 85%",
    onComplete,
  } = options;

  useLayoutEffect(() => {
    const titleEl = titleRef.current;
    if (!titleEl) return;

    // Read the heading's target original colour before any splitting or overrides
    const computedFinalColor =
      titleEl.getAttribute("data-final-color") ||
      getComputedStyle(titleEl).color ||
      "#000000";

    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (query.matches) {
      titleEl.style.color = "#000000";
      onComplete?.();
      return;
    }

    let split = null;
    let masterTimeline = null;
    let isCancelled = false;

    const setupAndPlay = () => {
      if (isCancelled) return;

      try {
        split = new SplitType(titleEl, {
          types: "words,chars",
          tagName: "span",
        });

        if (split.chars) {
          split.chars.forEach((char) => {
            char.style.display = "inline-block";
          });
        }

        const chars = split.chars;
        if (!chars || chars.length === 0) {
          titleEl.style.color = computedFinalColor;
          onComplete?.();
          return;
        }

        const START_COLOR = "rgb(217, 217, 217)";
        const PEAK_COLOR = "#DFFF00";
        const FINAL_COLOR = computedFinalColor;

        gsap.set(chars, { color: START_COLOR });

        const tlConfig = {
          onComplete: () => {
            titleEl.style.color = FINAL_COLOR;
            if (split && split.isSplit) {
              split.revert();
            }
            onComplete?.();
          },
        };

        if (triggerMode === "scroll") {
          tlConfig.scrollTrigger = {
            trigger: titleEl,
            start: scrollStart,
            once: true,
          };
        }

        masterTimeline = gsap.timeline(tlConfig);

        const stagger = secondsPerChar;
        chars.forEach((char, index) => {
          const startTime = index * stagger;

          masterTimeline.to(
            char,
            {
              color: PEAK_COLOR,
              duration: 0.35,
              ease: "sine.inOut",
            },
            startTime,
          );

          masterTimeline.to(
            char,
            {
              color: FINAL_COLOR,
              duration: 0.45,
              ease: "sine.inOut",
            },
            startTime + 0.35,
          );
        });
      } catch (err) {
        console.error("ColorWave init error:", err);
        titleEl.style.color = computedFinalColor;
        onComplete?.();
      }
    };

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(setupAndPlay);
    } else {
      setupAndPlay();
    }

    return () => {
      isCancelled = true;
      if (masterTimeline) masterTimeline.kill();
      if (split && split.isSplit) {
        split.revert();
      }
      titleEl.style.color = computedFinalColor;
    };
  }, [titleRef, waveWidth, secondsPerChar, triggerMode, scrollStart, onComplete]);
}
