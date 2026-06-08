"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: false,       // GSAP ticker drives the RAF
      duration: 1.4,        // slightly longer for a luxurious feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Keep ScrollTrigger in sync with Lenis scroll position
    lenis.on("scroll", ScrollTrigger.update);

    const tickerFn = (time: number) => {
      lenis.raf(time * 1000); // GSAP time is seconds; Lenis wants ms
    };
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0); // prevents GSAP lag compensation breaking Lenis

    // ScrollTrigger sets up before Lenis (useLayoutEffect vs useEffect order).
    // Refresh after Lenis is ready so pinned sections re-measure their positions.
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
