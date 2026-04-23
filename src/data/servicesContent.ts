import type { LucideIcon } from "lucide-react";
import {
  Droplets,
  Flame,
  CircleDot,
  Sparkles,
  Layers,
  Radio,
  Syringe,
  Dna,
  Activity,
  Leaf,
  ScanLine,
  GitBranch,
  Zap,
  CircleAlert,
  Heart,
} from "lucide-react";

export type ServiceEntry = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export type ServiceCategory = {
  id: string;
  title: string;
  image?: string;
  services: ServiceEntry[];
};

/**
 * Category-based services for the scroll-driven services section.
 * Face Health, Hair Health, Augmentation & Miscellaneous from design mockups.
 */
export const servicesCategories: ServiceCategory[] = [
  {
    id: "face-health",
    title: "Face Health",
    services: [
      { id: "hydra-facial", title: "Hydra Facial", description: "Deep cleansing, exfoliation, and hydration", icon: Droplets },
      { id: "co2-laser", title: "CO2 Resurfacing Laser", description: "Reduces scars, wrinkles, and pigmentation", icon: Flame },
      { id: "microneedling", title: "Microneedling", description: "Minimizes scars and refines skin texture", icon: CircleDot },
      { id: "mesotherapy", title: "Mesotherapy", description: "Brightening, rejuvenation, and hydration boost", icon: Sparkles },
      { id: "peels", title: "Chemical Peels", description: "Smooths texture and brightens skin", icon: Layers },
      { id: "rf-microneedling", title: "RF Microneedling", description: "Tightens skin and improves texture", icon: Radio },
      { id: "prp-face", title: "PRP", description: "Uses your own growth factors for healing", icon: Syringe },
      { id: "exosomes", title: "Exosomes", description: "Regenerative skin repair", icon: Dna },
    ],
  },
  {
    id: "hair-health",
    title: "Hair Health",
    services: [
      { id: "prp-hair", title: "PRP", description: "Growth factors to stimulate hair follicles", icon: Syringe },
      { id: "hair-exosomes", title: "Hair Exosomes", description: "Advanced cellular regeneration for hair restoration", icon: Dna },
      { id: "rf-microneedling-hair", title: "RF Microneedling", description: "Stimulates scalp and improves hair density", icon: Radio },
      { id: "hair-microneedling", title: "Hair Microneedling", description: "Boosts scalp circulation and collagen production", icon: Activity },
      { id: "hair-transplant", title: "Hair Transplant", description: "Permanent solution for hair thinning and bald spots", icon: Leaf },
    ],
  },
  {
    id: "augmentation-misc",
    title: "Augmentation & Miscellaneous",
    services: [
      { id: "hifu", title: "HIFU", description: "Lifts and tightens skin non-surgically.", icon: ScanLine },
      { id: "fillers", title: "Fillers", description: "Restores lost volume and enhances facial contours.", icon: Syringe },
      { id: "threads", title: "Threads", description: "Instant lifting effect with collagen boost.", icon: GitBranch },
      { id: "lipolytics", title: "Lipolytics", description: "Targets stubborn facial and body fat.", icon: Droplets },
      { id: "laser-hair-removal", title: "Laser Hair Removal", description: "Permanent reduction for smooth skin.", icon: Zap },
      { id: "mole-removal", title: "Mole Removal", description: "Quick, precise cosmetic removal with minimal scarring.", icon: CircleAlert },
      { id: "physiotherapy", title: "Physiotherapy", description: "Pain relief and mobility restoration.", icon: Heart },
    ],
  },
];

/** Number of services under Augmentation (first sub-header); the rest are Miscellaneous. */
export const AUGMENTATION_SERVICE_COUNT = 4;

/**
 * Four panels for the services section: Face Health, Hair Health, Augmentation, Miscellaneous.
 * Derived from servicesCategories so Augmentation and Misc are separate "pages".
 */
export type ServicePanel = { id: string; title: string; services: ServiceEntry[] };

export function getServicePanels(): ServicePanel[] {
  const face = servicesCategories[0];
  const hair = servicesCategories[1];
  const augMisc = servicesCategories[2];
  return [
    { id: face.id, title: face.title, services: face.services },
    { id: hair.id, title: hair.title, services: hair.services },
    {
      id: "augmentation",
      title: "Augmentation",
      services: augMisc.services.slice(0, AUGMENTATION_SERVICE_COUNT),
    },
    {
      id: "miscellaneous",
      title: "Miscellaneous",
      services: augMisc.services.slice(AUGMENTATION_SERVICE_COUNT),
    },
  ];
}

/** Flat list of all service titles for booking dropdown. */
export function serviceTitlesForBooking(): string[] {
  const titles: string[] = [];
  for (const cat of servicesCategories) {
    for (const s of cat.services) titles.push(s.title);
  }
  return titles;
}

export type TreatmentDetail = {
  id: string;
  bestFor: string;
  sessions: string;
  downtime: string;
  faq: string;
};

export const treatmentDetails: Record<string, TreatmentDetail> = {
  "hydra-facial": {
    id: "hydra-facial",
    bestFor: "Dull, congested, or dehydrated skin",
    sessions: "Monthly maintenance recommended",
    downtime: "None — resume normal activities immediately",
    faq: "A multi-step treatment that cleanses, exfoliates, extracts impurities, and deeply hydrates in a single session.",
  },
  "co2-laser": {
    id: "co2-laser",
    bestFor: "Acne scars, deep wrinkles, pigmentation",
    sessions: "1–3 sessions, 4–6 weeks apart",
    downtime: "5–7 days of redness and peeling",
    faq: "Fractional CO2 creates micro-channels in the skin to trigger collagen remodeling and resurface texture.",
  },
  "microneedling": {
    id: "microneedling",
    bestFor: "Scars, enlarged pores, uneven texture",
    sessions: "3–6 sessions, 4 weeks apart",
    downtime: "1–2 days of mild redness",
    faq: "Fine needles create controlled micro-injuries that stimulate your skin's natural repair process.",
  },
  "mesotherapy": {
    id: "mesotherapy",
    bestFor: "Skin brightening, hydration, rejuvenation",
    sessions: "4–6 sessions, 2 weeks apart",
    downtime: "Minimal — slight redness for a few hours",
    faq: "Targeted micro-injections deliver vitamins, enzymes, and hyaluronic acid directly into the skin.",
  },
  "peels": {
    id: "peels",
    bestFor: "Pigmentation, fine lines, dull complexion",
    sessions: "3–6 sessions depending on peel depth",
    downtime: "1–5 days depending on peel strength",
    faq: "A chemical solution is applied to remove outer skin layers, revealing smoother, brighter skin underneath.",
  },
  "rf-microneedling": {
    id: "rf-microneedling",
    bestFor: "Skin laxity, fine lines, acne scars",
    sessions: "3–4 sessions, 4–6 weeks apart",
    downtime: "2–3 days of mild swelling",
    faq: "Combines microneedling with radiofrequency energy to tighten and remodel tissue at deeper layers.",
  },
  "prp-face": {
    id: "prp-face",
    bestFor: "Dull skin, fine lines, under-eye circles",
    sessions: "3 sessions, 4 weeks apart",
    downtime: "1 day of mild redness",
    faq: "Your own platelet-rich plasma is extracted and re-injected to accelerate healing and collagen production.",
  },
  "exosomes": {
    id: "exosomes",
    bestFor: "Aging skin, post-procedure recovery",
    sessions: "2–3 sessions, 3–4 weeks apart",
    downtime: "None to minimal",
    faq: "Cell-derived exosomes deliver regenerative growth factors that repair and rejuvenate at a cellular level.",
  },
  "prp-hair": {
    id: "prp-hair",
    bestFor: "Early-stage hair thinning and loss",
    sessions: "3–4 sessions, 4 weeks apart; maintenance every 6 months",
    downtime: "None",
    faq: "Concentrated growth factors from your blood are injected into the scalp to stimulate dormant follicles.",
  },
  "hair-exosomes": {
    id: "hair-exosomes",
    bestFor: "Advanced hair thinning, post-transplant support",
    sessions: "2–4 sessions, 3–4 weeks apart",
    downtime: "None",
    faq: "Exosome therapy promotes cellular communication to reactivate hair growth cycles naturally.",
  },
  "rf-microneedling-hair": {
    id: "rf-microneedling-hair",
    bestFor: "Thinning hair with scalp laxity",
    sessions: "3–4 sessions, 4–6 weeks apart",
    downtime: "1–2 days of mild scalp tenderness",
    faq: "RF energy delivered through micro-needles stimulates blood flow and collagen in the scalp tissue.",
  },
  "hair-microneedling": {
    id: "hair-microneedling",
    bestFor: "Hair thinning, scalp health",
    sessions: "4–6 sessions, 2–4 weeks apart",
    downtime: "Minimal scalp redness for a day",
    faq: "Microneedling the scalp increases absorption of topical treatments and boosts natural regeneration.",
  },
  "hair-transplant": {
    id: "hair-transplant",
    bestFor: "Permanent baldness or significant thinning",
    sessions: "Single procedure; results over 6–12 months",
    downtime: "7–10 days; full recovery in 2–3 weeks",
    faq: "Healthy follicles are harvested and transplanted to thinning areas for permanent, natural-looking density.",
  },
  "hifu": {
    id: "hifu",
    bestFor: "Sagging skin on face, neck, or body",
    sessions: "1–2 sessions; annual maintenance",
    downtime: "None to minimal",
    faq: "Focused ultrasound energy reaches deep tissue layers to lift and tighten without incisions.",
  },
  "fillers": {
    id: "fillers",
    bestFor: "Volume loss, lip enhancement, contouring",
    sessions: "Single session; touch-up at 6–12 months",
    downtime: "Mild swelling for 1–3 days",
    faq: "Hyaluronic acid-based gels restore volume and define facial contours with immediate, natural-looking results.",
  },
  "threads": {
    id: "threads",
    bestFor: "Mild to moderate facial sagging",
    sessions: "Single session; lasts 12–18 months",
    downtime: "3–5 days of swelling and tenderness",
    faq: "Dissolvable threads are placed under the skin to mechanically lift tissue while stimulating collagen.",
  },
  "lipolytics": {
    id: "lipolytics",
    bestFor: "Double chin, stubborn fat pockets",
    sessions: "2–4 sessions, 4–6 weeks apart",
    downtime: "Swelling for 3–5 days",
    faq: "Injectable solutions break down localized fat deposits that are resistant to diet and exercise.",
  },
  "laser-hair-removal": {
    id: "laser-hair-removal",
    bestFor: "Unwanted body and facial hair",
    sessions: "6–8 sessions, 4–6 weeks apart",
    downtime: "None — mild redness fades within hours",
    faq: "Laser energy targets the hair follicle melanin, disabling regrowth while leaving surrounding skin unharmed.",
  },
  "mole-removal": {
    id: "mole-removal",
    bestFor: "Cosmetic mole or skin tag removal",
    sessions: "Single session",
    downtime: "3–5 days for healing",
    faq: "Precise removal techniques ensure minimal scarring and clean cosmetic outcomes.",
  },
  "physiotherapy": {
    id: "physiotherapy",
    bestFor: "Chronic pain, injury recovery, mobility issues",
    sessions: "Varies by condition — typically 6–12 sessions",
    downtime: "None",
    faq: "Manual therapy and targeted exercises restore function, relieve pain, and improve long-term mobility.",
  },
};
