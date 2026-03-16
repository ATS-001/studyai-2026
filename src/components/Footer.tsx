import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

const Footer = () => (
  <motion.footer
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
    className="relative z-10 border-t border-border bg-card/80 backdrop-blur-sm py-8"
  >
    <div className="container mx-auto px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-4">
        <Link to="/terms" className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors">
          Terms
        </Link>
        <Link to="/privacy" className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors">
          Privacy
        </Link>
        <Link to="/docs" className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors">
          Docs
        </Link>
        <a
          href="mailto:aaronsooraj001@gmail.com"
          className="flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
        >
          <Mail className="h-3 w-3" />
          Contact
        </a>
      </div>

      <div className="text-center">
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
      </div>
    </div>
  </motion.footer>
);

export default Footer;
