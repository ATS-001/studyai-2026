import { motion, AnimatePresence } from "framer-motion";

const PageLoader = ({ isLoading }: { isLoading: boolean }) => (
  <AnimatePresence>
    {isLoading && (
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
      >
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-6 font-mono text-2xl font-bold gradient-text"
        >
          StudyAI
        </motion.h2>
        <div className="hex-loader">
          <span /><span /><span /><span /><span /><span />
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-xs text-muted-foreground"
        >
          Loading...
        </motion.p>
      </motion.div>
    )}
  </AnimatePresence>
);

export default PageLoader;
