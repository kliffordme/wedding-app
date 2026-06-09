import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import AlternatingGallery from "./components/AlternatingGallery";
import ZoomGallery from "./components/ZoomGallery";
import PinnedSection from "./components/PinnedSection";
import HorizontalGallery from "./components/HorizontalGallery";
import AboutSection from "./components/AboutSection";
import TestimonialsSection from "./components/TestimonialsSection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AlternatingGallery />
        <ZoomGallery />
        <AboutSection />
        <PinnedSection />
        <HorizontalGallery />
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  );
}
