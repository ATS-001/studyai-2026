import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Github } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const links = [
    { to: "/", label: "Home" },
    { to: "/explore", label: "Explore" },
    { href: "https://ats-001.github.io/HexnicAI/", label: "HexnicAI" },
  ];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        <Link to="/" className="flex items-center gap-2">
          <motion.span
            className="text-xl font-mono font-bold gradient-text"
            whileHover={{ scale: 1.05 }}
          >
            StudyAI
          </motion.span>
        </Link>

        <div className="flex items-center gap-6">
          {links.map((link) =>
            link.href ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.to!}
                className={`text-sm font-medium transition-colors duration-300 ${
                  location.pathname === link.to
                    ? "text-primary text-glow"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            )
          )}

          <motion.a
            href="https://github.com/ATS-001/StudyAI"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 rounded-lg border border-glow/30 bg-secondary px-3 py-1.5 text-sm font-medium text-foreground transition-all hover:border-glow/60 hover:box-glow"
          >
            <Github className="h-4 w-4" />
            <span>StudyAI</span>
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
