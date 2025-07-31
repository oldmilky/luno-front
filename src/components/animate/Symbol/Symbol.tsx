import { letterVariants } from "@/assets/animations/animations";
import { motion } from "framer-motion";

const Symbol = ({ text, className }: { text: string; className: string }) => (
  <motion.div className={className}>
    {text.split("").map((char, index) => (
      <motion.span
        key={index}
        variants={letterVariants}
        custom={index}
        style={{ display: "inline-block" }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))}
  </motion.div>
);

export default Symbol;
