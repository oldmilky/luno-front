import { FC } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import s from "./MaskText.module.scss";

interface MaskTextProps {
  words: string[];
  styles?: React.CSSProperties;
  className?: string;
  amount?: number;
}

const MaskText: FC<MaskTextProps> = ({ words, styles, className, amount }) => {
  const animation = {
    initial: { y: "100%" },
    enter: (i: any) => ({
      y: "0",
      transition: {
        duration: 0.75,
        ease: [0.33, 1, 0.68, 1],
        delay: 0.075 * i,
      },
    }),
  };

  const { ref, inView, entry } = useInView({
    threshold: 0.75,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: amount }}
    >
      {words?.map((phrase: any, index: any) => {
        return (
          <div key={index} className={s.lineMask}>
            <motion.p
              custom={index}
              variants={animation}
              initial="initial"
              animate={inView ? "enter" : ""}
            >
              {phrase}
            </motion.p>
          </div>
        );
      })}
    </motion.div>
  );
};

export default MaskText;
