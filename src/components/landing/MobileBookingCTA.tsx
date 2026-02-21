import { Button } from "@/components/ui/button";

const MobileBookingCTA = () => (
  <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background/95 backdrop-blur-md border-t border-border p-3">
    <Button
      onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full text-base"
    >
      Book Your Consultation
    </Button>
  </div>
);

export default MobileBookingCTA;
