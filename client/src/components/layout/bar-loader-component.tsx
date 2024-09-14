import { motion, Variants } from "framer-motion";
import { HTMLProps } from "react";

const variants: Variants = {
  initial: {
    scaleY: 0.5,
    opacity: 0,
  },
  animate: {
    scaleY: 1,
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 1,
      ease: "circIn",
    },
  },
};

interface Props {
  className?: HTMLProps<HTMLElement>["className"];
}

const BarLoader = ({ className = "bg-white" }: Props) => {
  return (
    <motion.div
      transition={{
        staggerChildren: 0.25,
      }}
      initial="initial"
      animate="animate"
      className="flex gap-1"
    >
      <motion.div variants={variants} className={`h-12 w-2 ${className}`} />
      <motion.div variants={variants} className={`h-12 w-2 ${className}`} />
      <motion.div variants={variants} className={`h-12 w-2 ${className}`} />
      <motion.div variants={variants} className={`h-12 w-2 ${className}`} />
      <motion.div variants={variants} className={`h-12 w-2 ${className}`} />
    </motion.div>
  );
};

const BarLoaderComponent = ({ className }: Props) => {
  return (
    <div className="grid place-content-center px-4 py-24">
      <BarLoader className={className} />
    </div>
  );
};

export default BarLoaderComponent;
