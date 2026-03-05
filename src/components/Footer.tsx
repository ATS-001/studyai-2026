import { motion } from "framer-motion";

const Footer = () => (
  <motion.footer
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
    className="relative z-10 border-t border-border bg-card/80 backdrop-blur-sm py-8 text-center"
  >
    <p className="font-mono text-sm font-semibold text-foreground">
      Developed by Brooklynvast07
    </p>
    <p className="mt-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
      LEGAL – A PART OF ATS_PDZ (AARONTS)
    </p>
    <p className="text-xs text-muted-foreground">
      COPYRIGHT © SINCE 2023 | ATS-PDZ
    </p>
    <p className="text-xs text-muted-foreground">ALL RIGHTS RESERVED.</p>
  </motion.footer>
);

export default Footer;
