import { motion } from "framer-motion";

const branches = [
  {
    name: "Bahadurabad",
    members: [
      { name: "Bushra Waseem", role: "Floor Manager" },
      { name: "Dr. Hafsa", role: "Aesthetic Physician" },
      { name: "Dr. Fatima", role: "Aesthetic Physician" },
      { name: "Haleema", role: "Aesthetic Nurse" },
    ],
  },
  {
    name: "DHA",
    members: [
      { name: "Tariq", role: "Aesthetic Nurse" },
      { name: "Shumaila", role: "Aesthetic Nurse" },
    ],
  },
];

const bothBranches = [
  { name: "Dr. Meesum Mir", role: "Operations & Growth Lead" },
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

      {/* Both branches – Operations & Growth Lead */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4 }}
        className="mb-12"
      >
        <p className="text-xs font-sans font-semibold tracking-wider uppercase text-primary/80 mb-4">
          Both branches
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          {bothBranches.map((member) => (
            <div key={member.name} className="text-center min-w-[160px]">
              <div className="aspect-square rounded-2xl bg-cream mb-4 flex items-center justify-center mx-auto max-w-[140px]">
                <span className="text-muted-foreground text-sm font-sans">Photo</span>
              </div>
              <h3 className="font-rounded text-lg font-semibold text-foreground">{member.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Branch-specific teams */}
      <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
        {branches.map((branch, bi) => (
          <motion.div
            key={branch.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: bi * 0.1 }}
          >
            <p className="text-sm font-sans font-semibold tracking-wider uppercase text-primary mb-6">
              {branch.name}
            </p>
            <div className="grid grid-cols-2 gap-6">
              {branch.members.map((member, i) => (
                <div key={member.name} className="text-center">
                  <div className="aspect-square rounded-2xl bg-cream mb-4 flex items-center justify-center">
                    <span className="text-muted-foreground text-sm font-sans">Photo</span>
                  </div>
                  <h3 className="font-rounded text-base font-semibold text-foreground">{member.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{member.role}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TeamSection;
