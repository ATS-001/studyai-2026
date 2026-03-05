import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";

const team = [
  {
    initials: "ATS",
    name: "Aaron Thalakkottor Sooraj",
    linkedin: "https://www.linkedin.com/",
  },
  {
    initials: "AT",
    name: "Alwin Thomas V",
    linkedin: "https://www.linkedin.com/",
  },
];

const About = () => {
  return (
    <div className="relative z-10 container mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 flex items-center justify-between"
      >
        <h1 className="font-mono text-4xl font-bold gradient-text text-glow">
          StudyAI
        </h1>
        <span className="rounded-full border border-glow/30 px-4 py-1 text-xs font-mono text-primary">
          Adaptive Study Orchestrator
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-10 font-mono text-2xl font-bold text-foreground"
      >
        Our Team
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mx-auto max-w-2xl"
      >
        <div className="mb-4 text-center">
          <span className="inline-block rounded-full border border-border px-4 py-1 text-sm font-mono text-muted-foreground">
            Brooklynvast07
          </span>
        </div>

        <div className="glass rounded-3xl p-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.15 }}
                whileHover={{ y: -4, scale: 1.03 }}
                className="flex flex-col items-center rounded-2xl bg-secondary/50 p-6 transition-all"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 border-glow/40 bg-muted font-mono text-2xl font-bold text-primary"
                >
                  {member.initials}
                </motion.div>
                <h3 className="mb-3 text-center font-mono text-sm font-semibold text-foreground">
                  {member.name}
                </h3>
                <motion.a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0A66C2] text-[#fff] transition-shadow hover:shadow-[0_0_20px_rgba(10,102,194,0.5)]"
                >
                  <Linkedin className="h-4 w-4" />
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
