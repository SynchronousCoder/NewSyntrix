"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "./gsapSetup";

export function useServicesAccordion(count) {
  const root = useRef(null);
  const timer = useRef(null);
  const [openIndex, setOpenIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(true);
  const activate = useCallback((index) => setOpenIndex(index), []);

  useGSAP(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = gsap.utils.toArray(".specialization-item", root.current);
    items.forEach((item, index) => {
      const panel = item.querySelector(".specialization-panel");
      const detail = item.querySelector(".specialization-detail");
      const bar = item.querySelector(".specialization-progress span");
      const symbol = item.querySelector(".specialization-symbol");
      const active = index === openIndex;
      gsap.killTweensOf([panel, detail, bar, symbol]);
      gsap.set(panel, { height: active ? "auto" : 0, overflow: "hidden", display: "block" });
      gsap.set(detail, { opacity: active ? 1 : 0, y: active ? 0 : 8 });
      gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });
      gsap.to(symbol, { rotation: active ? 0 : 0, duration: 0.25, ease: "power2.out" });
      if (active && !reduced) {
        gsap.fromTo(panel, { height: 0 }, { height: "auto", duration: 0.45, ease: "power3.out", overwrite: true });
        gsap.fromTo(detail, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35, delay: 0.08, ease: "power2.out", overwrite: true });
        timer.current = gsap.to(bar, { scaleX: 1, duration: 5, ease: "none", onComplete: () => setOpenIndex((index + 1) % count) });
        if (hovered || !visible) timer.current.pause();
      } else {
        gsap.to(panel, { height: 0, duration: reduced ? 0 : 0.3, ease: "power2.inOut", overwrite: true });
        gsap.to(detail, { opacity: 0, y: 8, duration: reduced ? 0 : 0.2, overwrite: true });
      }
    });
    return () => timer.current?.kill();
  }, { scope: root, dependencies: [openIndex, count] });

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const trigger = ScrollTrigger.create({ trigger: node, start: "top bottom", end: "bottom top", onToggle: (self) => setVisible(self.isActive) });
    return () => trigger.kill();
  }, []);

  useEffect(() => {
    if (hovered || !visible) timer.current?.pause();
    else timer.current?.resume();
  }, [hovered, visible]);

  return { root, openIndex, activate, setHovered };
}
