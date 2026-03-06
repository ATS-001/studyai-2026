import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Clock, Download } from "lucide-react";
import heroImg from "@/assets/hero-study.jpg";
import featureAi from "@/assets/feature-ai.jpg";
import featureSchedule from "@/assets/feature-schedule.jpg";

const features = [
  {
    img: featureAi,
    title: "Adaptive Intelligence",
    desc: "AI-driven study plans that adapt to your difficulty levels and time constraints.",
    icon: Brain,
    delay: 0.2,
  },
  {
    img: featureSchedule,
    title: "Smart Timetables",
    desc: "Generate optimized study schedules with built-in breaks and difficulty weighting.",
    icon: Clock,
    delay: 0.4,
  },
  {
    img: featureAi,
    title: "Export & Share",
    desc: "Download timetables as PNG, JPG, PDF or share them instantly.",
    icon: Download,
    delay: 0.6,
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Index = () => {
  return (
    <div className="relative z-10">
      {/* Hero */}
      <section className="flex min-h-[90vh] flex-col items-center justify-center px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4 inline-block rounded-full border border-glow/30 px-4 py-1 text-xs font-mono text-primary"
        >
          Adaptive Study Orchestrator
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="mb-2 font-mono text-6xl md:text-8xl font-bold gradient-text text-glow"
        >
          StudyAI
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-8 h-1 w-40 rounded-full bg-primary/60 origin-center"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mb-10 max-w-xl text-muted-foreground"
        >
          Generate intelligent, difficulty-weighted study timetables. Powered by HexnicAI.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex gap-4"
        >
          <Link
            to="/explore"
            className="group flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-mono text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_30px_hsl(145_80%_50%/0.3)]"
          >
            Get Started
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/about"
            className="rounded-lg border border-border px-6 py-3 font-mono text-sm font-medium text-foreground transition-all hover:border-glow/50 hover:text-primary"
          >
            About The Team
          </Link>
        </motion.div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 pb-24">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-8 md:grid-cols-2"
        >
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              variants={item}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`glass rounded-2xl overflow-hidden ${i === 2 ? "md:col-span-2 md:max-w-lg md:mx-auto" : ""}`}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={i % 2 === 0 ? f.img : featureSchedule}
                  alt={f.title}
                  className="h-full w-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <f.icon className="absolute bottom-4 left-4 h-8 w-8 text-primary" />
              </div>
              <div className="p-6">
                <h3 className="mb-2 font-mono text-lg font-bold text-foreground">
                  {f.title}
                </h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Hero image accent */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.15 }}
        viewport={{ once: true }}
        className="pointer-events-none fixed bottom-0 right-0 w-1/2 h-1/2"
      >
        <img src={heroImg} alt="" className="h-full w-full object-cover rounded-tl-[100px]" />
      </motion.div>
    </div>
  );
};

export default Index;
