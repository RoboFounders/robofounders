import { motion, useReducedMotion } from "framer-motion";

export const Reveal = ({ children, delay = 0, y = 28, className = "" }) => {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.6, 0.35, 1] }}
    >
      {children}
    </motion.div>
  );
};

export const SectionLabel = ({ children, className = "" }) => (
  <span
    className={`inline-block text-xs font-bold uppercase tracking-[0.28em] text-[#4d6bff] ${className}`}
  >
    {children}
  </span>
);
