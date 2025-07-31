import React from "react";
import { motion } from "framer-motion";
import { opacity, expand } from "./StairsPage";

export default function StairsLayout({ children, backgroundColor }: any) {
  const anim = (variants: any, custom: any = null) => {
    return {
      initial: "initial",
      animate: "enter",
      exit: "exit",
      custom,
      variants,
    };
  };

  const nbOfColumns = 5;

  return (
    <div className="page stairs" style={{ backgroundColor }}>
      <motion.div {...anim(opacity)} className="transition-background" />

      <div className="transition-container">
        {[...Array(nbOfColumns)].map((_, i) => {
          return <motion.div key={i} {...anim(expand, nbOfColumns - i)} />;
        })}
      </div>

      {children}
    </div>
  );
}
