import { motion, Variants } from "framer-motion";

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
  colorClass: string;
}

const BarLoader = ({ colorClass = "bg-white" }: Props) => {
  return (
    <motion.div
      transition={{
        staggerChildren: 0.25,
      }}
      initial="initial"
      animate="animate"
      className="flex gap-1"
    >
      <motion.div variants={variants} className={`h-12 w-2 ${colorClass}`} />
      <motion.div variants={variants} className={`h-12 w-2 ${colorClass}`} />
      <motion.div variants={variants} className={`h-12 w-2 ${colorClass}`} />
      <motion.div variants={variants} className={`h-12 w-2 ${colorClass}`} />
      <motion.div variants={variants} className={`h-12 w-2 ${colorClass}`} />
    </motion.div>
  );
};

const BarLoaderComponent = ({ colorClass }: Props) => {
  return (
    <div className="grid place-content-center px-4 py-24">
      <BarLoader colorClass={colorClass} />
    </div>
  );
};

export default BarLoaderComponent;
