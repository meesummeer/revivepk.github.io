import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  /** Slightly different shadow on the hero (dark) vs cream pages */
  onHero?: boolean;
};

/**
 * Stands alone below the fixed navbar, top-left, with a slight upward overlap
 * (navbar stays on top at z-50; this is z-40).
 */
export function BrandLogo({ className, onHero }: BrandLogoProps) {
  return (
    <Link
      to="/"
      className={cn(
        "fixed z-40 left-3 sm:left-4 lg:left-8 w-auto -mt-4 sm:-mt-5",
        "top-[3.4rem] sm:top-14",
        "transition-opacity hover:opacity-90 focus-visible:outline-none",
        "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        className
      )}
      aria-label="Revive Healthcare - Home"
    >
      <img
        src="/logo.png"
        alt=""
        className={cn(
          "w-auto object-contain block h-20 sm:h-24 md:h-28 lg:h-32",
          onHero ? "drop-shadow-md" : "drop-shadow-sm"
        )}
        aria-hidden
      />
    </Link>
  );
}

export default BrandLogo;
