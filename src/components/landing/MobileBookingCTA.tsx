import { Button } from "@/components/ui/button";
const WHATSAPP_URL = "https://wa.me/923030008483";

const MobileBookingCTA = () => (
  <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background/95 backdrop-blur-md border-t border-border p-3">
    <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full text-base">
      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
        Book Your Consultation
      </a>
    </Button>
  </div>
);

export default MobileBookingCTA;
