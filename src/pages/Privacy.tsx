import { motion } from "framer-motion";

const Privacy = () => (
  <div className="relative z-10 container mx-auto px-4 sm:px-6 py-16 sm:py-20 max-w-3xl">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <h1 className="font-mono text-3xl font-bold gradient-text text-glow">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground">Last updated: March 2026</p>

      <section className="space-y-3">
        <h2 className="font-mono text-lg font-semibold text-foreground">1. Information We Collect</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          StudyAI processes the data you enter (name, class, subjects, modules) locally in your browser to generate timetables. We do not store, transmit, or share your personal data with any third parties.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-mono text-lg font-semibold text-foreground">2. Data Storage</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          All data processing happens client-side. Your information is never sent to external servers. Generated timetables are created in your browser and exported directly to your device.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-mono text-lg font-semibold text-foreground">3. Cookies & Analytics</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          We may use basic analytics to understand usage patterns (e.g., page visits). No personally identifiable information is collected through analytics.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-mono text-lg font-semibold text-foreground">4. Third-Party Services</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The Service may link to third-party websites (e.g., GitHub). We are not responsible for the privacy practices of external sites.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-mono text-lg font-semibold text-foreground">5. Children's Privacy</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          StudyAI is designed for students of all ages. We do not knowingly collect personal information from children under 13 without parental consent.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-mono text-lg font-semibold text-foreground">6. Contact</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          For privacy-related inquiries, contact us at{" "}
          <a href="mailto:aaronsooraj001@gmail.com" className="text-primary hover:underline">aaronsooraj001@gmail.com</a>.
        </p>
      </section>
    </motion.div>
  </div>
);

export default Privacy;
