import { motion } from "framer-motion";

const Docs = () => (
  <div className="relative z-10 container mx-auto px-4 sm:px-6 py-16 sm:py-20 max-w-3xl">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <h1 className="font-mono text-3xl font-bold gradient-text text-glow">Documentation</h1>
      <p className="text-sm text-muted-foreground">How to use StudyAI effectively</p>

      <section className="space-y-3">
        <h2 className="font-mono text-lg font-semibold text-foreground">Getting Started</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          StudyAI generates personalized study timetables based on your subjects, modules, and their difficulty levels. Follow the step-by-step wizard to create your schedule.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-mono text-lg font-semibold text-foreground">Step-by-Step Guide</h2>

        <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
          <h3 className="font-mono text-sm font-semibold text-primary">Step 1 — Basic Details</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Enter your name, class, division, institution, and roll number. Name and institution are required fields.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
          <h3 className="font-mono text-sm font-semibold text-primary">Step 2 — Subjects & Modules</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Add your subjects and their modules. Set difficulty for each module (Easy, Medium, Hard). Configure your study window (start/end time) and break preferences.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
          <h3 className="font-mono text-sm font-semibold text-primary">Step 3 — Timetable Preview</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Review your generated timetable. Time is distributed proportionally based on difficulty weights: Easy = 1x, Medium = 2x, Hard = 3x.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
          <h3 className="font-mono text-sm font-semibold text-primary">Step 4 — Export & Share</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Download your timetable as PNG, JPG, JPEG, or PDF. You can also share it directly using your device's share functionality or copy it to clipboard.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-mono text-lg font-semibold text-foreground">How Difficulty Weighting Works</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The algorithm allocates more study time to harder modules. A "Hard" module gets 3x the time of an "Easy" module, and a "Medium" module gets 2x. This ensures you spend more time where it matters most.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-mono text-lg font-semibold text-foreground">Need Help?</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Contact us at{" "}
          <a href="mailto:aaronsooraj001@gmail.com" className="text-primary hover:underline">aaronsooraj001@gmail.com</a>{" "}
          for support or feature requests.
        </p>
      </section>
    </motion.div>
  </div>
);

export default Docs;
