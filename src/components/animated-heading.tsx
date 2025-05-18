"use client";
import { motion, Variants } from "framer-motion";

export const AnimatedHeading = ({ text }: { text: string }) => {
  const letters = Array.from(text);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.15,
        ease: [0.19, 1, 0.22, 1],
      },
    },
  };

  const characterVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "tween",
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <div className="relative inline-block overflow-hidden">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 flex"
      >
        {letters.map((char, index) => (
          <motion.span
            key={index}
            variants={characterVariants}
            className="inline-block will-change-transform"
            style={{ transformOrigin: "bottom center" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};
