import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PricingCards from "../components/PricingCards";
import Link from "next/link";

export const metadata = {
  title: "Packages & Pricing | CARLOGAID",
  description:
    "Explore CARLOGAID wedding photography packages — from intimate elopement coverage to full-day documentary storytelling.",
};

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Page hero */}
        <div className="bg-forest py-24 px-6 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gold font-sans mb-3">
            Packages
          </p>
          <h1 className="font-serif text-5xl md:text-6xl text-ivory font-light">
            Invest in the Unforgettable
          </h1>
          <div className="w-16 h-px bg-gold mx-auto mt-6" />
          <p className="font-sans text-ivory/60 text-sm mt-6 max-w-lg mx-auto leading-relaxed">
            Three thoughtfully designed packages, each crafted to document your
            wedding day with artistry and care. Fully customisable to your story.
          </p>
        </div>

        <PricingCards />

        {/* FAQ teaser */}
        <section className="py-20 px-6 bg-forest text-center">
          <p className="font-serif text-3xl md:text-4xl text-ivory font-light mb-4">
            Have Questions?
          </p>
          <p className="font-sans text-ivory/60 text-sm max-w-md mx-auto leading-relaxed mb-8">
            Not sure which package suits you? Reach out and we will help you
            find the perfect fit for your day and budget.
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 border border-gold text-gold font-sans text-sm tracking-[0.25em] uppercase hover:bg-gold hover:text-forest transition-all duration-300"
          >
            Get in Touch
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
