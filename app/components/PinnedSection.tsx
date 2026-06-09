"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PinnedSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // GSAP owns initial state — ctx.revert() restores visibility on cleanup
    gsap.set(labelRef.current, { opacity: 0, y: 24, letterSpacing: "0.5em" });
    gsap.set(headlineRef.current, { opacity: 0, y: 48, filter: "blur(8px)" });
    gsap.set(dividerRef.current, { scaleX: 0, opacity: 0, transformOrigin: "center" });
    gsap.set(bodyRef.current, { opacity: 0, y: 20 });

    const ctx = gsap.context(() => {
      // Ambient Ken Burns on the image — not scrubbed, always running
      gsap.fromTo(
        imageRef.current,
        { scale: 1 },
        { scale: 1.07, duration: 18, ease: "none", repeat: -1, yoyo: true }
      );

      // Scrubbed staggered reveal — tied to scroll progress through the section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "center 25%",
          scrub: 2,
        },
      });

      tl.to(labelRef.current, {
        opacity: 1,
        y: 0,
        letterSpacing: "0.3em",
        duration: 1,
        ease: "power2.out",
      })
        .to(
          headlineRef.current,
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.6, ease: "power3.out" },
          "-=0.4"
        )
        .to(
          dividerRef.current,
          { scaleX: 1, opacity: 1, duration: 0.8, ease: "power2.inOut" },
          "-=0.6"
        )
        .to(
          bodyRef.current,
          { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
          "-=0.4"
        );
    });

    // Let the page fully paint before calculating scroll positions (critical on mobile)
    const rafId = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(rafId);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative min-h-screen w-full overflow-hidden">
      {/* Ken Burns wrapper */}
      <div ref={imageRef} className="absolute inset-0">
        <Image
          src="/wedding-promise-bnw.jpg"
          alt="The grand estate at twilight"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/30 to-transparent" />

      <div className="absolute inset-0 flex flex-col items-center justify-end pb-24 px-6 text-center">
        <p ref={labelRef} className="text-xs uppercase text-gold font-sans mb-4">
          The CARLOGAID Promise
        </p>
        <h2
          ref={headlineRef}
          className="font-serif text-4xl md:text-6xl lg:text-7xl text-ivory font-light leading-tight max-w-3xl"
        >
          Where Light Meets Love
        </h2>
        <div ref={dividerRef} className="w-16 h-px bg-gold mx-auto my-6" />
        <p
          ref={bodyRef}
          className="font-sans text-ivory/75 text-sm md:text-base leading-relaxed max-w-xl"
        >
          From the first enquiry to the final image delivered, every moment with
          CARLOGAID is guided by artistry, warmth, and an unwavering commitment
          to telling your story exactly as it was.
        </p>
      </div>
    </div>
  );
}
