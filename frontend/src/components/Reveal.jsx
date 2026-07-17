import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

/**
 * Wraps any content and animates it into view as the user scrolls to it.
 * Usage: <Reveal><YourContent /></Reveal>
 * Optional props: delay (seconds), y (start offset), once (default true)
 */
const Reveal = ({ children, delay = 0, y = 28, once = true, className = "" }) => {
  const { ref, inView } = useInView({ triggerOnce: once, threshold: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
