import { motion } from "framer-motion";

const Terms = () => (
  <div className="relative z-10 container mx-auto px-4 sm:px-6 py-16 sm:py-20 max-w-3xl">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <h1 className="font-mono text-3xl font-bold gradient-text text-glow">Terms of Service</h1>
      <p className="text-sm text-muted-foreground">Last updated: March 2026</p>

      <section className="space-y-3">
        <h2 className="font-mono text-lg font-semibold text-foreground">1. Acceptance of Terms</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          By accessing or using StudyAI ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-mono text-lg font-semibold text-foreground">2. Description of Service</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          StudyAI is an AI-powered study schedule generator that helps students create personalized timetables based on their subjects, modules, and difficulty levels. The Service is provided "as is" without warranties of any kind.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-mono text-lg font-semibold text-foreground">3. User Responsibilities</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          You are responsible for all data you input into the Service. You agree not to misuse the Service, attempt to reverse-engineer it, or use it for any unlawful purpose.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-mono text-lg font-semibold text-foreground">4. Intellectual Property</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          All content, design, and code of StudyAI are the intellectual property of ATS-PDZ. You may not reproduce, distribute, or create derivative works without prior written consent.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-mono text-lg font-semibold text-foreground">5. Limitation of Liability</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          StudyAI and ATS-PDZ shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Service.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-mono text-lg font-semibold text-foreground">6. Changes to Terms</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          We reserve the right to modify these terms at any time. Continued use of the Service after changes constitutes acceptance of the new terms.
        </p>
      </section>
    </motion.div>
  </div>
);

export default Terms;
