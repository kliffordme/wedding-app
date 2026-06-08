"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(formRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.2,
      });
    });
    return () => ctx.revert();
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // Simulate async submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
        <span className="text-gold font-serif text-5xl">✦</span>
        <h3 className="font-serif text-3xl text-forest font-light">
          Thank You
        </h3>
        <p className="font-sans text-forest/60 text-sm max-w-sm leading-relaxed">
          Your enquiry has been received. A member of our team will be in touch
          within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-xs tracking-[0.2em] uppercase font-sans text-forest/70"
          >
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full bg-transparent border-b border-forest/30 focus:border-gold outline-none py-2 font-sans text-sm text-forest placeholder-forest/30 transition-colors duration-200"
            placeholder="Your full name"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-xs tracking-[0.2em] uppercase font-sans text-forest/70"
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full bg-transparent border-b border-forest/30 focus:border-gold outline-none py-2 font-sans text-sm text-forest placeholder-forest/30 transition-colors duration-200"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label
            htmlFor="date"
            className="block text-xs tracking-[0.2em] uppercase font-sans text-forest/70"
          >
            Wedding Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            className="w-full bg-transparent border-b border-forest/30 focus:border-gold outline-none py-2 font-sans text-sm text-forest transition-colors duration-200"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="guests"
            className="block text-xs tracking-[0.2em] uppercase font-sans text-forest/70"
          >
            Guest Count
          </label>
          <input
            id="guests"
            name="guests"
            type="number"
            min="1"
            className="w-full bg-transparent border-b border-forest/30 focus:border-gold outline-none py-2 font-sans text-sm text-forest placeholder-forest/30 transition-colors duration-200"
            placeholder="e.g. 80"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="package"
          className="block text-xs tracking-[0.2em] uppercase font-sans text-forest/70"
        >
          Package Interest
        </label>
        <select
          id="package"
          name="package"
          className="w-full bg-ivory border-b border-forest/30 focus:border-gold outline-none py-2 font-sans text-sm text-forest transition-colors duration-200"
        >
          <option value="">Select a package (optional)</option>
          <option value="elopement">Elopement — From $4,500</option>
          <option value="lumiere">Lumière Signature — From $12,500</option>
          <option value="estate">Estate Exclusive — From $22,000</option>
          <option value="custom">Custom / Not sure yet</option>
        </select>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="message"
          className="block text-xs tracking-[0.2em] uppercase font-sans text-forest/70"
        >
          Your Vision
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full bg-transparent border-b border-forest/30 focus:border-gold outline-none py-2 font-sans text-sm text-forest placeholder-forest/30 transition-colors duration-200 resize-none"
          placeholder="Tell us about your dream wedding…"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto px-12 py-4 bg-forest text-ivory font-sans text-sm tracking-[0.25em] uppercase hover:bg-gold hover:text-forest disabled:opacity-60 transition-all duration-300"
      >
        {loading ? "Sending…" : "Send Enquiry"}
      </button>
    </form>
  );
}
