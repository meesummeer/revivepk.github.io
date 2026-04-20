import { useEffect } from "react";
import { motion } from "framer-motion";

const BookingSection = () => {
  useEffect(() => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://link.msgsndr.com/js/form_embed.js"]',
    );
    if (existingScript) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <section id="booking" className="relative py-20 lg:py-28 bg-background overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
      >
        <div className="absolute -top-28 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
      </div>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <p className="text-sm font-sans font-semibold tracking-widest uppercase text-primary mb-3">
              Private Consultation 📅
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3 leading-tight">
              Want to book a private consultation with <span className="whitespace-nowrap">Dr. Husnain</span>?
            </h2>
            <p className="text-muted-foreground">
              Select your preferred branch below to continue.
            </p>
          </motion.div>
          <div className="relative rounded-3xl border border-primary/20 bg-card/95 backdrop-blur-sm shadow-[0_16px_50px_rgba(0,0,0,0.10)] p-6 md:p-8 space-y-6 overflow-hidden">
            <div
              className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -right-16 -top-14 h-40 w-40 rounded-full bg-primary/10 blur-2xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -left-12 -bottom-16 h-36 w-36 rounded-full bg-gold/10 blur-2xl"
              aria-hidden="true"
            />
            <div className="space-y-3">
              <div className="inline-flex items-center gap-3 rounded-full border border-primary/20 bg-cream/70 px-3 py-1.5">
                <img src="/logo.png" alt="Revive Healthcare" className="h-7 w-auto object-contain" />
                <span className="text-xs font-semibold tracking-wide uppercase text-primary">
                  Private Booking Flow
                </span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-foreground">
                Select your preferred branch below
              </h3>
              <div className="grid gap-2 text-sm text-muted-foreground">
                <p>
                  <span className="font-semibold text-foreground">Step 1:</span> Choose your preferred branch and submit the form.
                </p>
                <p>
                  <span className="font-semibold text-foreground">Step 2:</span> You will be redirected to the correct calendar for that branch.
                </p>
              </div>
            </div>

            <div className="w-full min-h-[434px] rounded-xl border border-border/70 bg-background p-2 shadow-inner">
              <iframe
                src="https://api.leadconnectorhq.com/widget/form/lUr07AMdknR3wuhEtQU8"
                style={{ width: "100%", height: "100%", border: "none", borderRadius: "8px" }}
                id="inline-lUr07AMdknR3wuhEtQU8"
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="Branch Selection Form"
                data-height="434"
                data-layout-iframe-id="inline-lUr07AMdknR3wuhEtQU8"
                data-form-id="lUr07AMdknR3wuhEtQU8"
                title="Branch Selection Form"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
