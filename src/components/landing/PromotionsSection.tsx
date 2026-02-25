import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const RAMADAN_DEALS = [
  { id: 1, title: "Deal 1", services: "Buy 2 Hydrafacials Get 1 Free", originalPrice: "21,000", discountedPrice: "14,000", priceOnly: null as string | null },
  { id: 2, title: "Deal 2", services: "1 Hydrafacial + 1 Face Laser Session", originalPrice: null, discountedPrice: null, priceOnly: "10,000" },
  { id: 3, title: "Deal 3", services: "1 CO2 Resurfacing Session + 1 Hydrafacial", originalPrice: "32,000", discountedPrice: "25,000", priceOnly: null },
  { id: 4, title: "Deal 4", services: "Hydrafacial + Peel", originalPrice: "10,000", discountedPrice: "7,000", priceOnly: null },
  { id: 5, title: "Deal 5", services: "Hydrafacial + BB Glow", originalPrice: "17,000", discountedPrice: "12,000", priceOnly: null },
  { id: 6, title: "Deal 6", services: "Hydrafacial + Hair PRP + Face PRP + BB Glow + Dermaplaning", originalPrice: null, discountedPrice: null, priceOnly: "20,000" },
];

const PromotionsSection = () => (
  <section id="promotions" className="py-20 lg:py-24 bg-primary/5">
    <div className="container mx-auto px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 bg-gold/20 text-foreground rounded-full px-4 py-1.5 text-sm font-medium mb-4">
          <Sparkles className="h-4 w-4 text-gold" />
          Ramadan Deals
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
          Special offers this Ramadan
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Premium treatments at exclusive prices. Book now and save.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {RAMADAN_DEALS.map((deal, i) => (
          <motion.div
            key={deal.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="rounded-2xl border border-gold/30 bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <p className="text-xs font-sans font-semibold tracking-wider uppercase text-gold mb-3">
              {deal.title}
            </p>
            <p className="font-rounded text-base font-semibold text-foreground leading-snug mb-4">
              {deal.services}
            </p>
            <div className="space-y-1">
              {deal.priceOnly ? (
                <p className="font-serif text-lg font-bold text-primary">
                  Rs {deal.priceOnly}
                </p>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground line-through">
                    Rs {deal.originalPrice}
                  </p>
                  <p className="font-serif text-lg font-bold text-primary">
                    Rs {deal.discountedPrice}
                  </p>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-10"
      >
        <Button
          onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-10 text-base"
        >
          Book a deal
        </Button>
      </motion.div>
    </div>
  </section>
);

export default PromotionsSection;
