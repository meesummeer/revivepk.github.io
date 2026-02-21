import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";

const PromotionsSection = () => (
  <section className="py-20 lg:py-24 bg-primary/5">
    <div className="container mx-auto px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto text-center"
      >
        <div className="inline-flex items-center gap-2 bg-gold/20 text-foreground rounded-full px-4 py-1.5 text-sm font-medium mb-6">
          <Gift className="h-4 w-4 text-gold" />
          Limited Offer
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
          20% Off Your First Visit
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed mb-3">
          Begin your journey to radiant confidence with an exclusive introductory offer
          on any consultation or treatment package.
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          Valid until March 31, 2026 • Cannot be combined with other offers
        </p>
        <Button
          onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-10 text-base"
        >
          Claim Your Offer
        </Button>
      </motion.div>
    </div>
  </section>
);

export default PromotionsSection;
