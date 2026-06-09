"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

const heroVideos = ["/wedding-dinner.mp4", "/wedding-ring.mp4", "/wedding-close-up.mp4"];

export default function HeroSection() {
  const logoRef    = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const videoRefs  = useRef<(HTMLVideoElement | null)[]>([null, null, null]);
  const mountedRef = useRef(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: "power2.out" }
      );
      gsap.fromTo(logoRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.6, ease: "power3.out" }
      );
      gsap.fromTo(taglineRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 1, delay: 1.8, ease: "power2.out" }
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      videoRefs.current[0]?.play().catch(() => {});
      return;
    }

    videoRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === active) {
        el.currentTime = 0;
        el.play().catch(() => {});
        gsap.to(el, { opacity: 1, duration: 1.5, ease: "power2.inOut" });
      } else {
        gsap.to(el, {
          opacity: 0,
          duration: 1.5,
          ease: "power2.inOut",
          onComplete: () => el.pause(),
        });
      }
    });
  }, [active]);

  const handleEnded = useCallback(() => {
    setActive((prev) => (prev + 1) % heroVideos.length);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {heroVideos.map((src, i) => (
        <video
          key={src}
          ref={(el) => { videoRefs.current[i] = el; }}
          muted
          playsInline
          onEnded={handleEnded}
          className={`absolute inset-0 w-full h-full object-cover grayscale ${i === 0 ? "" : "opacity-0"}`}
          aria-hidden="true"
        >
          <source src={src} type="video/mp4" />
        </video>
      ))}

      <div
        ref={overlayRef}
        style={{ opacity: 0 }}
        className="absolute inset-0 bg-gradient-to-b from-forest/60 via-forest/40 to-forest/70"
      />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <div ref={logoRef} style={{ opacity: 0 }} className="space-y-4">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="block w-12 h-px bg-white/60" />
            <span className="text-white text-xs tracking-[0.35em] uppercase font-sans">
              Wedding Photography
            </span>
            <span className="block w-12 h-px bg-white/60" />
          </div>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-white font-light tracking-wider leading-none">
            CARLOGAID
          </h1>
          <p ref={taglineRef} style={{ opacity: 0 }} className="font-sans text-sm md:text-base tracking-[0.3em] uppercase text-white/80 mt-4">
            Every moment, beautifully preserved
          </p>
        </div>
      </div>
    </section>
  );
}
