import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-cream">
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-gold/10 pointer-events-none" />
      <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 py-20 lg:py-32 relative z-10">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-sans font-semibold tracking-widest uppercase text-primary mb-4"
          >
            Premium Aesthetic Medicine
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground mb-6"
          >
            Where Science Meets{" "}
            <span className="text-primary italic">Beauty</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-lg"
          >
            Experience world-class aesthetic treatments delivered by internationally
            recognized specialists in a serene, luxurious environment.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              onClick={() => scrollTo("#booking")}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 text-base"
            >
              Book Your Consultation
            </Button>
            <Button
              onClick={() => scrollTo("#services")}
              variant="outline"
              size="lg"
              className="rounded-full px-8 text-base border-foreground/20 hover:bg-foreground/5"
            >
              Explore Treatments
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
