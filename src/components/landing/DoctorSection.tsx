import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award, Globe, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

const badges = [
  { icon: Globe, label: "International Speaker" },
  { icon: Award, label: "Board Director" },
  { icon: GraduationCap, label: "Aesthetic Specialist" },
];

const COLLAGE_IMAGES = [
  { src: "/pic1.jpeg", alt: "Dr. Husnain Shah clinic moment 1" },
  { src: "/pic2.jpeg", alt: "Dr. Husnain Shah clinic moment 2" },
  { src: "/pic3.jpeg", alt: "Dr. Husnain Shah clinic moment 3" },
  { src: "/pic4.jpeg", alt: "Dr. Husnain Shah clinic moment 4" },
  { src: "/pic5.jpeg", alt: "Dr. Husnain Shah clinic moment 5" },
  { src: "/pic6.jpeg", alt: "Dr. Husnain Shah clinic moment 6" },
];
const WHATSAPP_URL = "https://wa.me/923030008483";
const CREDENTIALS = [
  "Aesthetic Consultant",
  "Director @IEBDAC",
  "American Academy of Aesthetic Medicine",
  "MCPS Dermatology",
];

type SlotName = "large" | "top" | "bottom";

const SLOT_CLASSES: Record<SlotName, string> = {
  large:
    "left-0 top-0 w-[260px] sm:w-[300px] aspect-[3/4] rounded-2xl border-2 border-chrome-foreground/20 shadow-xl",
  top:
    "-top-4 -right-10 hidden lg:block w-[100px] sm:w-[120px] aspect-square rounded-xl border-2 border-chrome-foreground/20 shadow-lg",
  bottom:
    "-bottom-6 -right-6 hidden sm:block w-[120px] sm:w-[140px] aspect-square rounded-xl border-2 border-chrome-foreground/20 shadow-lg",
};

export default function DoctorSection() {
  const [slotImages, setSlotImages] = useState<[number, number, number]>([0, 1, 2]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlotImages((prev) => {
        const [, top, bottom] = prev;
        const nextImage = (bottom + 1) % COLLAGE_IMAGES.length;
        return [top, bottom, nextImage];
      });
    }, 3000);
    return () => window.clearInterval(timer);
  }, []);
  const collageItems: Array<{ slot: SlotName; imageIndex: number }> = [
    { slot: "large", imageIndex: slotImages[0] },
    { slot: "top", imageIndex: slotImages[1] },
    { slot: "bottom", imageIndex: slotImages[2] },
  ];

  return (
    <section
      id="doctor"
      className="relative scroll-mt-20 py-14 lg:py-20 bg-[#0d9488] text-chrome-foreground overflow-hidden"
      style={{ scrollSnapAlign: "start", scrollMarginTop: "72px" }}
    >
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
              <div className="w-[260px] sm:w-[300px] aspect-[3/4]" />
              <AnimatePresence initial={false}>
                {collageItems.map(({ slot, imageIndex }) => {
                  const image = COLLAGE_IMAGES[imageIndex];
                  const zIndex = slot === "large" ? 1 : 10;
                  return (
                    <motion.div
                      key={image.src}
                      layout
                      className={`absolute overflow-hidden ${SLOT_CLASSES[slot]}`}
                      style={{ zIndex }}
                      initial={{ opacity: 0.75, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
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
            <div className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm lg:text-base font-medium tracking-wide text-chrome-foreground/75">
              {CREDENTIALS.map((item, idx) => (
                <span key={item} className="inline-flex items-center">
                  {idx > 0 && <span className="mr-2 text-chrome-foreground/45" aria-hidden>&bull;</span>}
                  {item}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              {badges.map((badge) => (
                <span
                  key={badge.label}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold border border-chrome-foreground/25 bg-chrome-foreground/10 text-chrome-foreground"
                >
                  <badge.icon className="h-4 w-4" />
                  {badge.label}
                </span>
              ))}
            </div>

            <p className="text-chrome-foreground text-lg leading-relaxed mb-6 max-w-xl">
              <span className="font-semibold">Almost a decade</span> of experience in aesthetic medicine.
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
