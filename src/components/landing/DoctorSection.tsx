import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Award, Globe, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

const badges = [
  { icon: Globe, label: "International Speaker" },
  { icon: Award, label: "Board Director" },
  { icon: GraduationCap, label: "Aesthetic Specialist" },
];

/** 6 placeholder images: 1 left (grows), 2-6 reveal into a collage on the right. */
const DOCTOR_IMAGES = [
  { id: 0, src: "/pic1.jpeg", alt: "Doctor image 1" },
  { id: 1, src: "/pic2.jpeg", alt: "Doctor image 2" },
  { id: 2, src: "/pic3.jpeg", alt: "Doctor image 3" },
  { id: 3, src: "/pic4.jpeg", alt: "Doctor image 4" },
  { id: 4, src: "/pic5.jpeg", alt: "Doctor image 5" },
  { id: 5, src: "/pic6.jpeg", alt: "Doctor image 6" },
];

const STEP_RANGES: [number, number][] = [
  [0, 0.18],
  [0.18, 0.36],
  [0.36, 0.54],
  [0.54, 0.72],
  [0.72, 0.88],
  [0.88, 1],
];

function getStepOpacity(progress: number, start: number, end: number): number {
  const range = end - start;
  const fadeInEnd = start + range * 0.2;
  const fadeOutStart = end - range * 0.2;
  if (progress <= start || progress >= end) return 0;
  if (progress <= fadeInEnd) return (progress - start) / (fadeInEnd - start);
  if (progress >= fadeOutStart) return (end - progress) / (end - fadeOutStart);
  return 1;
}

function getStepY(progress: number, start: number, end: number): number {
  const range = end - start;
  const fadeInEnd = start + range * 0.2;
  const fadeOutStart = end - range * 0.2;
  if (progress < fadeInEnd) return 12 * (1 - (progress - start) / (fadeInEnd - start));
  if (progress > fadeOutStart) return 12 * (progress - fadeOutStart) / (end - fadeOutStart);
  return 0;
}

function getStepIndex(progress: number): number {
  if (progress <= 0) return 0;
  if (progress >= 1) return 5;
  for (let i = 0; i < STEP_RANGES.length; i++) {
    const [start, end] = STEP_RANGES[i];
    if (progress >= start && progress < end) return i;
  }
  return 5;
}

const sectionLight = "text-white";
const sectionMuted = "text-white/85";
const gradientClass = "bg-dark-emerald-gradient";

const IMG_SIZE = "w-[120px] h-[120px] sm:w-[142px] sm:h-[142px]";
const LEFT_IMG_BASE = "max-w-[200px] sm:max-w-[240px] aspect-square";

export default function DoctorSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [tallHeight, setTallHeight] = useState("400vh");

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const updateHeight = () => setTallHeight(window.innerWidth < 768 ? "300vh" : "400vh");
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const updateProgress = useCallback(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    if (rect.top > 0) {
      setProgress(0);
      return;
    }
    if (rect.bottom < vh) {
      setProgress(1);
      return;
    }
    const scrollRange = rect.height - vh;
    if (scrollRange <= 0) {
      setProgress(1);
      return;
    }
    const p = -rect.top / scrollRange;
    setProgress(Math.max(0, Math.min(1, p)));
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    let rafId: number;
    const onScroll = () => {
      rafId = requestAnimationFrame(updateProgress);
    };
    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, [reduceMotion, updateProgress]);

  const stepIndex = getStepIndex(progress);
  const leftScale = reduceMotion ? 1 : 1 + progress * 0.28;
  const firstImageReveal = reduceMotion ? 1 : Math.max(0, Math.min(1, (progress - 0.04) / 0.12));

  if (reduceMotion) {
    return (
      <section id="doctor" className={`py-20 lg:py-28 ${gradientClass}`}>
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative flex justify-center">
              <div className={`${LEFT_IMG_BASE} rounded-2xl overflow-hidden border-2 border-white/30 shadow-lg`}>
                <img src={DOCTOR_IMAGES[0].src} alt={DOCTOR_IMAGES[0].alt} className="w-full h-full object-cover" />
              </div>
            </div>
            <div className={`font-rounded ${sectionLight}`}>
              <p className={`text-sm lg:text-base font-semibold tracking-[0.2em] uppercase ${sectionMuted} mb-4`}>Meet the Doctor</p>
              <h2 className="font-rounded text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 tracking-tight leading-[1.1]">Dr. Husnain Shah</h2>
              <p className={`${sectionMuted} text-lg lg:text-xl font-medium tracking-wide mb-8`}>Aesthetic Medicine Specialist</p>
              <div className="flex flex-wrap gap-3 mb-6">
                {badges.map((badge) => (
                  <span key={badge.label} className="inline-flex items-center gap-2 bg-white/15 text-white rounded-full px-5 py-2.5 text-base font-semibold border border-white/25">
                    <badge.icon className="h-5 w-5" />
                    {badge.label}
                  </span>
                ))}
              </div>
              <p className={`${sectionLight} text-lg lg:text-xl leading-relaxed mb-8`}>
                <span className="font-semibold">Over 15 years</span> of experience in aesthetic medicine. Director of the International Education Board of Aesthetics, Dr. Husnain Shah leads training programs across three continents.
              </p>
              <Button onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })} className="bg-gold text-gold-foreground hover:bg-gold/90 rounded-full px-10 py-6 text-lg font-semibold shadow-lg">
                Book a consultation with Dr. Husnain Shah
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div id="doctor" ref={wrapperRef} className={`relative ${gradientClass}`} style={{ minHeight: tallHeight }}>
      <div className="sticky top-0 min-h-screen w-full flex flex-col justify-center py-12 px-4 overflow-hidden">
        <div className="container mx-auto max-w-6xl flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
          {/* Left: first image, grows with scroll */}
          <div className="shrink-0 flex flex-col items-center lg:items-end">
            <motion.div
              className={`${LEFT_IMG_BASE} rounded-2xl overflow-hidden border-2 border-white/30 shadow-lg`}
              style={{ scale: leftScale, opacity: firstImageReveal }}
              transition={{ type: "linear", duration: 0.1 }}
            >
              <img src={DOCTOR_IMAGES[0].src} alt={DOCTOR_IMAGES[0].alt} className="w-full h-full object-cover" />
            </motion.div>
            <div className="w-full max-w-[200px] sm:max-w-[240px] mt-4">
              <div className="h-1 w-full rounded-full bg-white/20 overflow-hidden">
                <div className="h-full bg-gold rounded-full origin-left transition-transform duration-75 ease-out" style={{ transform: `scaleX(${progress})`, width: "100%" }} />
              </div>
            </div>
          </div>

          {/* Right: text area + revealing collage */}
          <div className="relative flex-1 min-w-0 min-h-[420px] sm:min-h-[470px] py-14 px-10 sm:py-16 sm:px-14">
            {/* Images 2–6 reveal as a layered collage on desktop; once visible they stay */}
            {DOCTOR_IMAGES.slice(1, 6).map((img, idx) => {
              const show = stepIndex >= idx + 1; // image 2 at step 1, image 3 at step 2, ...
              const positions = [
                "top-2 right-44 -rotate-6",
                "top-16 right-10 rotate-3",
                "top-48 right-40 rotate-6",
                "bottom-20 right-8 -rotate-4",
                "bottom-2 right-44 rotate-5",
              ];
              return (
                <motion.div
                  key={img.id}
                  className={`hidden lg:block absolute rounded-xl overflow-hidden border-2 border-white/30 shadow-lg bg-white/10 ${IMG_SIZE} ${positions[idx]}`}
                  initial={false}
                  animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 0.9, y: show ? 0 : 8 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  style={{ zIndex: 5 + idx }}
                >
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                </motion.div>
              );
            })}

            {/* Step-driven text content */}
            <div className="relative z-10 min-h-[250px] max-w-[500px] lg:max-w-[540px] mx-auto lg:mx-0 lg:pr-[320px] px-4 sm:px-6 lg:px-0 flex flex-col justify-center items-start text-left font-rounded">
              {STEP_RANGES.map(([start, end], i) => {
                const opacity = getStepOpacity(progress, start, end);
                const y = getStepY(progress, start, end);
                return (
                  <motion.div
                    key={i}
                    className="absolute inset-0 flex flex-col justify-center px-0 sm:px-4"
                    style={{
                      opacity,
                      y,
                      pointerEvents: opacity > 0.5 ? "auto" : "none",
                      visibility: opacity < 0.01 ? "hidden" : "visible",
                    }}
                  >
                    {i === 0 && (
                      <>
                        <p className={`text-sm lg:text-base font-semibold tracking-[0.2em] uppercase ${sectionMuted} mb-4`}>Meet the Doctor</p>
                        <h2 className="font-rounded text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-3 tracking-tight leading-[1.1]">Dr. Husnain Shah</h2>
                        <p className={`${sectionMuted} text-lg lg:text-xl font-medium tracking-wide`}>Aesthetic Medicine Specialist</p>
                      </>
                    )}
                    {i === 1 && (
                      <>
                      <div className="flex flex-wrap justify-start gap-3 mb-6">
                          {badges.map((badge) => (
                            <span key={badge.label} className="inline-flex items-center gap-2 bg-white/15 text-white rounded-full px-5 py-2.5 text-base font-semibold border border-white/25">
                              <badge.icon className="h-5 w-5" />
                              {badge.label}
                            </span>
                          ))}
                        </div>
                        <p className={`${sectionLight} text-lg lg:text-xl leading-relaxed max-w-xl`}>
                          <span className="font-semibold">Over 15 years</span> in aesthetic medicine. Director of the International Education Board of Aesthetics, leading training programs across three continents.
                        </p>
                      </>
                    )}
                    {i === 2 && (
                      <blockquote className="border-l-4 border-gold pl-8 pr-4 py-2 text-white leading-relaxed text-xl lg:text-2xl italic max-w-xl">
                        <span className="text-gold font-semibold not-italic">&ldquo;My philosophy is simple:</span> enhance your natural beauty with precision, safety, and artistry. Every treatment plan is as unique as the individual.&rdquo;
                      </blockquote>
                    )}
                    {i === 3 && (
                      <>
                        <p className={`text-base font-semibold tracking-[0.15em] uppercase ${sectionMuted} mb-4`}>Key focus</p>
                      <div className="flex flex-wrap justify-start gap-3 mb-4">
                          <span className="inline-flex items-center rounded-full bg-white/15 text-white px-5 py-2.5 text-base font-semibold border border-white/25">Evidence-based practice</span>
                          <span className="inline-flex items-center rounded-full bg-white/15 text-white px-5 py-2.5 text-base font-semibold border border-white/25">Bespoke treatment plans</span>
                          <span className="inline-flex items-center rounded-full bg-white/15 text-white px-5 py-2.5 text-base font-semibold border border-white/25">International standards</span>
                          <span className="inline-flex items-center rounded-full bg-white/15 text-white px-5 py-2.5 text-base font-semibold border border-white/25">Safety & artistry</span>
                        </div>
                        <p className={`${sectionLight} text-lg leading-relaxed max-w-xl`}>Every consultation is tailored with precision and care.</p>
                      </>
                    )}
                    {i === 4 && (
                      <>
                        <p className={`text-base font-semibold tracking-[0.15em] uppercase ${sectionMuted} mb-4`}>Global footprint</p>
                        <div className="flex flex-wrap justify-start gap-3">
                          <span className="inline-flex items-center rounded-full bg-white/15 text-white px-5 py-2.5 text-base font-semibold border border-white/25">Trusted worldwide</span>
                          <span className="inline-flex items-center rounded-full bg-white/15 text-white px-5 py-2.5 text-base font-semibold border border-white/25">Three continents</span>
                          <span className="inline-flex items-center rounded-full bg-white/15 text-white px-5 py-2.5 text-base font-semibold border border-white/25">Training programs</span>
                          <span className="inline-flex items-center rounded-full bg-white/15 text-white px-5 py-2.5 text-base font-semibold border border-white/25">Patients & professionals</span>
                        </div>
                      </>
                    )}
                    {i === 5 && (
                      <div className="pt-2">
                        <Button onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })} className="bg-gold text-gold-foreground hover:bg-gold/90 rounded-full px-10 py-6 text-lg font-semibold shadow-lg">
                          Book a consultation with Dr. Husnain Shah
                        </Button>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
