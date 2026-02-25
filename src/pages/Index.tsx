import { useState, useEffect } from "react";
import NewsBanner from "@/components/landing/NewsBanner";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import DoctorSection from "@/components/landing/DoctorSection";
import ServicesSection from "@/components/landing/ServicesSection";
import PromotionsSection from "@/components/landing/PromotionsSection";
import TeamSection from "@/components/landing/TeamSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import ResultsSection from "@/components/landing/ResultsSection";
import BookingSection from "@/components/landing/BookingSection";
import Footer from "@/components/landing/Footer";
import MobileBookingCTA from "@/components/landing/MobileBookingCTA";
import VerticalSectionNav from "@/components/landing/VerticalSectionNav";

const SCROLL_PROGRESS_START = 40;
const SCROLL_PROGRESS_END = 140;

const Index = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrollProgress(Math.max(0, Math.min(1, (y - SCROLL_PROGRESS_START) / (SCROLL_PROGRESS_END - SCROLL_PROGRESS_START))));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <NewsBanner />
      <Navbar scrollProgress={scrollProgress} />
      <VerticalSectionNav />
      <main>
        <HeroSection scrollProgress={scrollProgress} />
        <DoctorSection />
        <ServicesSection />
        <PromotionsSection />
        <TeamSection />
        <TestimonialsSection />
        <ResultsSection />
        <BookingSection />
      </main>
      <Footer />
      <MobileBookingCTA />
    </>
  );
};

export default Index;
