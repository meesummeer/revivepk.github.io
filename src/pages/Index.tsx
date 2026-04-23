import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import DoctorSection from "@/components/landing/DoctorSection";
import ServicesSection from "@/components/landing/ServicesSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import BookingSection from "@/components/landing/BookingSection";
import Footer from "@/components/landing/Footer";
import MobileBookingCTA from "@/components/landing/MobileBookingCTA";

const Index = () => {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <DoctorSection />
        <ServicesSection />
        <TestimonialsSection />
        <BookingSection />
      </main>
      <Footer />
      <MobileBookingCTA />
    </>
  );
};

export default Index;
