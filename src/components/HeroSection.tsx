import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroBanner from "@/assets/hero-banner.jpg";

const HeroSection = () => (
  <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
    <img
      src={heroBanner}
      alt="Spring/Summer Collection – contemporary fashion"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-foreground/20" />
    <div className="relative h-full container flex flex-col justify-end pb-16 md:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-xl"
      >
        <p className="text-primary-foreground/80 text-sm uppercase tracking-[0.3em] mb-3 font-body">
          Spring / Summer 2026
        </p>
        <h1 className="text-4xl md:text-6xl font-display font-semibold text-primary-foreground leading-tight mb-6">
          The New <br />Essentials
        </h1>
        <Link
          to="/products"
          className="inline-block bg-background text-foreground px-8 py-3.5 text-sm font-body font-medium uppercase tracking-widest hover:bg-card transition-colors"
        >
          Shop Collection
        </Link>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
