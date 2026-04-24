import { motion } from "framer-motion";
import { Award, Globe, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

const badges = [
  { icon: Globe, label: "International Speaker" },
  { icon: Award, label: "Board Director" },
  { icon: GraduationCap, label: "Aesthetic Specialist" },
];

const MAIN_PORTRAIT = { src: "/dr-husnain.jpeg", alt: "Dr. Husnain Shah" };

const ACCENT_IMAGES = [
  { src: "/pic4.jpeg", alt: "Dr. Husnain Shah at patient" },
  { src: "/pic3.jpeg", alt: "Dr. Husnain Shah with award" },
];
const WHATSAPP_URL = "https://wa.me/923030008483";

export default function DoctorSection() {
  return (
    <section id="doctor" className="relative scroll-mt-20 py-14 lg:py-20 bg-[#0d9488] text-chrome-foreground overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div className="absolute -top-20 right-0 h-72 w-72 rounded-full bg-gold/12 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-gold/8 blur-3xl" />
      </div>
      <div className="container relative z-10 mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              <div className="w-[260px] sm:w-[300px] aspect-[3/4] rounded-2xl overflow-hidden border-2 border-chrome-foreground/20 shadow-xl">
                <img src={MAIN_PORTRAIT.src} alt={MAIN_PORTRAIT.alt} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-[120px] sm:w-[140px] aspect-square rounded-xl overflow-hidden border-2 border-chrome-foreground/20 shadow-lg hidden sm:block">
                <img src={ACCENT_IMAGES[0].src} alt={ACCENT_IMAGES[0].alt} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -top-4 -right-10 w-[100px] sm:w-[120px] aspect-square rounded-xl overflow-hidden border-2 border-chrome-foreground/20 shadow-lg hidden lg:block">
                <img src={ACCENT_IMAGES[1].src} alt={ACCENT_IMAGES[1].alt} className="w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-rounded"
          >
            <p className="text-sm lg:text-base font-semibold tracking-[0.2em] uppercase text-chrome-foreground/80 mb-4">
              Meet the Doctor
            </p>
            <h2 className="font-rounded text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 tracking-tight leading-[1.1] text-chrome-foreground">
              Dr. Husnain Shah
            </h2>
            <p className="text-chrome-foreground/85 text-lg lg:text-xl font-medium tracking-wide mb-6">
              Aesthetic Medicine Specialist
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              {badges.map((badge) => (
                <span
                  key={badge.label}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold border border-chrome-foreground/25 bg-[#0f766e]-foreground/10 text-chrome-foreground"
                >
                  <badge.icon className="h-4 w-4" />
                  {badge.label}
                </span>
              ))}
            </div>

            <p className="text-chrome-foreground text-lg leading-relaxed mb-6 max-w-xl">
              <span className="font-semibold">Over 15 years</span> of experience in aesthetic medicine.
              Director of the International Education Board of Aesthetics, Dr. Husnain Shah
              leads training programs across three continents.
            </p>

            <blockquote className="border-l-4 border-gold pl-6 py-2 text-chrome-foreground/90 leading-relaxed text-lg italic mb-8 max-w-xl">
              <span className="text-gold font-semibold not-italic">&ldquo;My philosophy is simple:</span> enhance
              your natural beauty with precision, safety, and artistry. Every treatment plan is as unique as the
              individual.&rdquo;
            </blockquote>

            <Button asChild className="bg-gold text-gold-foreground hover:bg-gold/90 rounded-full px-10 py-6 text-lg font-semibold shadow-lg">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                Book a Consultation
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
