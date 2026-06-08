"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      // Mobile: GSAP's normalizeScroll handles touch events so pins work correctly
      ScrollTrigger.normalizeScroll(true);
      requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => ScrollTrigger.normalizeScroll(false);
    }

    // Desktop: Lenis smooth scroll drives GSAP ticker
    const lenis = new Lenis({
      autoRaf: false,
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tickerFn = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
