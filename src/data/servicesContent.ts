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
