import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GalleryGrid from "../components/GalleryGrid";

export const metadata = {
  title: "Portfolio | CARLOGAID",
  description:
    "Browse the CARLOGAID wedding photography portfolio — documentary stories of couples from intimate elopements to full celebrations.",
};

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Page hero */}
        <div className="bg-forest py-24 px-6 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gold font-sans mb-3">
            Portfolio
          </p>
          <h1 className="font-serif text-5xl md:text-6xl text-ivory font-light">
            Gallery
          </h1>
          <div className="w-16 h-px bg-gold mx-auto mt-6" />
          <p className="font-sans text-ivory/60 text-sm mt-6 max-w-md mx-auto leading-relaxed">
            A curated selection of weddings we have had the honour of
            documenting — each one a story, each one unique.
          </p>
        </div>

        <GalleryGrid />
      </main>
      <Footer />
    </>
  );
}
