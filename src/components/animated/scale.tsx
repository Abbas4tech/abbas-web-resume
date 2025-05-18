import { motion, AnimatePresence, Spring, MotionProps } from "framer-motion";
import React from "react";

const springConfig: Spring = {
  type: "spring",
  stiffness: 400,
  damping: 15,
  mass: 0.5,
};

const buttonVariants = {
  rest: {
    scale: 1,
    transition: springConfig,
  },
  hover: {
    scale: 1.05,
    transition: springConfig,
  },
  tap: {
    scale: 0.95,
    transition: springConfig,
  },
};

type ScaleProps = MotionProps & React.PropsWithChildren;

const Scale = ({ children, ...props }: ScaleProps) => {
  return (
    <AnimatePresence>
      <motion.div
        className="flex items-center gap-2"
        initial="rest"
        animate="rest"
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariants}
        layout
        {...props}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default Scale;
