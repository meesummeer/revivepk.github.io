import { useState } from "react";
import { X } from "lucide-react";

const NewsBanner = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative border-b border-gold/20 bg-primary/5 py-2.5 px-4 text-center text-sm font-sans text-foreground">
      <div className="container mx-auto flex flex-wrap items-center justify-center gap-1.5">
        <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 px-2.5 py-0.5 font-semibold text-gold border border-gold/30">
          New ✨
        </span>
        <span className="text-foreground/90">Advanced skin rejuvenation treatments now available.</span>{" "}
        <a
          href="#booking"
          className="underline underline-offset-2 font-medium text-primary hover:text-gold transition-colors decoration-gold/50"
        >
          Book your consultation today 📅 →
        </a>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-sm hover:bg-gold/10 transition-colors"
        aria-label="Dismiss announcement"
      >
        <X className="h-3.5 w-3.5 text-muted-foreground hover:text-gold transition-colors" />
      </button>
    </div>
  );
};

export default NewsBanner;
