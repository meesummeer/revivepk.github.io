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
      <main
        style={{
          scrollSnapType: "y proximity",
          overflowY: "scroll",
          height: "100vh",
          scrollBehavior: "smooth",
        }}
      >
        <HeroSection />
        <DoctorSection />
        <ServicesSection />
        <TestimonialsSection />
        <BookingSection />
        <div style={{ scrollSnapAlign: "start" }}>
          <Footer />
        </div>
      </main>
      <MobileBookingCTA />
    </>
  );
};

export default Index;
