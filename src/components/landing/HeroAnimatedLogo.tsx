import { useState } from "react";
import { motion } from "framer-motion";

/** Percentage positions for particles: lower so they read as falling from the tree. [left%, top%] */
const PARTICLE_POSITIONS: [number, number][] = [
  [28, 20],
  [48, 26],
  [68, 22],
  [38, 30],
  [58, 32],
  [32, 40],
  [52, 38],
  [42, 46],
  [62, 44],
  [35, 56],
  [55, 54],
  [45, 62],
  [50, 50],
  [40, 36],
  [60, 34],
  [44, 24],
  [56, 28],
  [30, 48],
  [70, 52],
];

const floatVariants = [
  { x: [0, 10, -6, 0], y: [0, -14, 16, 0] },
  { x: [0, -8, 12, 0], y: [0, 16, -10, 0] },
  { x: [0, 6, -10, 0], y: [0, -16, 14, 0] },
  { x: [0, -12, 8, 0], y: [0, 12, -18, 0] },
];

const floatVariantsHover = [
  { x: [0, 14, -10, 0], y: [0, -18, 20, 0] },
  { x: [0, -12, 16, 0], y: [0, 20, -12, 0] },
  { x: [0, 10, -14, 0], y: [0, -20, 16, 0] },
  { x: [0, -16, 12, 0], y: [0, 14, -22, 0] },
];

const BASE_DURATION = 2.5;
const HOVER_DURATION_MULTIPLIER = 0.4;

type HeroAnimatedLogoProps = {
  reduceMotion?: boolean;
};

export default function HeroAnimatedLogo({ reduceMotion = false }: HeroAnimatedLogoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const duration = BASE_DURATION * (isHovered ? HOVER_DURATION_MULTIPLIER : 1);
  const variants = isHovered ? floatVariantsHover : floatVariants;

  return (
    <div className="relative w-full min-h-[320px] lg:min-h-[420px] flex items-center justify-center">
      <div
        className="relative inline-block w-full max-w-[320px] lg:max-w-[380px] overflow-hidden rounded-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src="/logo.png"
          alt="Revive Healthcare"
          className="w-full h-auto max-h-[50vh] object-contain block"
        />
        {!reduceMotion && (
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
            aria-hidden
          >
            {PARTICLE_POSITIONS.map(([left, top], i) => (
              <motion.span
                key={i}
                className={`absolute rounded-full ${i % 3 === 0 ? "bg-gold/50" : "bg-primary/40"} border border-gold/20`}
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  width: 6,
                  height: 6,
                  marginLeft: -3,
                  marginTop: -3,
                }}
                animate={variants[i % variants.length]}
                transition={{
                  duration: duration + (i % 3) * 0.3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
