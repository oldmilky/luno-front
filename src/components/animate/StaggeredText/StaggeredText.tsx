"use client";
import { motion, useInView } from "framer-motion";
import * as React from "react";

type TextStaggeredFadeProps = {
  text: string;
  className?: string;
  links?: boolean;
};

export const StaggeredFade: React.FC<TextStaggeredFadeProps> = ({
  text,
  className = "",
  links = false,
}) => {
  const variants = {
    hidden: { opacity: 0 },
    show: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { delay: i * 0.02 },
    }),
  };

  const variantsLinks = {
    hidden: { opacity: 0 },
    show: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { delay: i * 0.05 },
    }),
  };

  const letters = text.split("");
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.h2
      ref={ref}
      initial="hidden"
      animate={isInView ? "show" : ""}
      variants={variants}
      viewport={{ once: true }}
      className={className}
    >
      {letters.map((word, i) => (
        <motion.span key={`${word}-${i}`} variants={links ? variantsLinks : variants} custom={i}>
          {word}
        </motion.span>
      ))}
    </motion.h2>
  );
};
