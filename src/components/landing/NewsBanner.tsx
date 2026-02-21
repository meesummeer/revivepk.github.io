import { useState } from "react";
import { X } from "lucide-react";

const NewsBanner = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative bg-primary/10 py-2.5 px-4 text-center text-sm font-sans text-foreground">
      <div className="container mx-auto">
        <span className="text-primary font-semibold">New:</span>{" "}
        Advanced skin rejuvenation treatments now available.{" "}
        <a href="#booking" className="underline underline-offset-2 font-medium text-primary hover:text-primary/80 transition-colors">
          Book your consultation today →
        </a>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-sm hover:bg-primary/10 transition-colors"
        aria-label="Dismiss announcement"
      >
        <X className="h-3.5 w-3.5 text-muted-foreground" />
      </button>
    </div>
  );
};

export default NewsBanner;
