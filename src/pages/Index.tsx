import NewsBanner from "@/components/landing/NewsBanner";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import DoctorSection from "@/components/landing/DoctorSection";
import ServicesSection from "@/components/landing/ServicesSection";
import PromotionsSection from "@/components/landing/PromotionsSection";
import TeamSection from "@/components/landing/TeamSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import BookingSection from "@/components/landing/BookingSection";
import Footer from "@/components/landing/Footer";
import MobileBookingCTA from "@/components/landing/MobileBookingCTA";

const Index = () => {
  return (
    <>
      <NewsBanner />
      <Navbar />
      <main>
        <HeroSection />
        <DoctorSection />
        <ServicesSection />
        <PromotionsSection />
        <TeamSection />
        <TestimonialsSection />
        <BookingSection />
      </main>
      <Footer />
      <MobileBookingCTA />
    </>
  );
};

export default Index;
