import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BrownianMotion from "./BrownianMotion";
import PageLoader from "./PageLoader";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <PageLoader isLoading={loading} />
      <BrownianMotion />
      <Navbar />
      <main className="relative z-10 pt-16 min-h-screen">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
