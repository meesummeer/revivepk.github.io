import { motion } from "framer-motion";

const team = [
  { name: "Dr. Sarah Mitchell", role: "Medical Director" },
  { name: "Dr. James Chen", role: "Aesthetic Physician" },
  { name: "Amira Patel", role: "Senior Aesthetician" },
  { name: "Olivia Brooks", role: "Patient Coordinator" },
];

const TeamSection = () => (
  <section id="team" className="py-20 lg:py-28 bg-background">
    <div className="container mx-auto px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <p className="text-sm font-sans font-semibold tracking-widest uppercase text-primary mb-3">
          Our People
        </p>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
          Meet the Team
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {team.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="text-center"
          >
            <div className="aspect-square rounded-2xl bg-cream mb-5 flex items-center justify-center">
              <span className="text-muted-foreground text-sm font-sans">Photo</span>
            </div>
            <h3 className="font-serif text-lg font-semibold text-foreground">{member.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{member.role}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TeamSection;
