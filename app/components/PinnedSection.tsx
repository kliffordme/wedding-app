"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PinnedSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 1,
        },
      });

      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, ease: "power2.out" }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative h-screen w-full overflow-hidden">
      {/* Full-bleed cinematic image */}
      <Image
        src="/wedding-promise-bnw.jpg"
        alt="The grand estate at twilight"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />

      {/* Dark vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/30 to-transparent" />

      {/* Text overlay */}
      <div
        ref={textRef}
        className="absolute inset-0 flex flex-col items-center justify-end pb-24 px-6 text-center"
      >
        <p className="text-xs tracking-[0.3em] uppercase text-gold font-sans mb-4">
          The CARLOGAID Promise
        </p>
        <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-ivory font-light leading-tight max-w-3xl">
          Where Light Meets Love
        </h2>
        <div className="w-16 h-px bg-gold mx-auto my-6" />
        <p className="font-sans text-ivory/75 text-sm md:text-base leading-relaxed max-w-xl">
          From the first enquiry to the final image delivered, every moment with
          CARLOGAID is guided by artistry, warmth, and an unwavering commitment
          to telling your story exactly as it was.
        </p>
      </div>
    </div>
  );
}
