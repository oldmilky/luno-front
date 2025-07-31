import { FC, useState } from "react";
import s from "./Answer.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { AnswerProps } from "./Answer.interface";
import MaskText from "@/components/animate/MaskText/MaskText";

const textAnimation = {
  initial: {
    opacity: 0,
    y: -20,
    height: 0,
  },
  animate: {
    opacity: 1,
    y: 0,
    height: "auto",
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    height: 0,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

const Answer: FC<AnswerProps> = ({
  title,
  number,
  text,
  themeWhite,
  isActive,
  onHover,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const isElementActive = isActive || isOpen;

  return (
    <motion.section
      className={themeWhite ? s.answerWhite : s.answer}
      onHoverStart={() => onHover(true)}
      onHoverEnd={() => onHover(false)}
    >
      <div className={s.content} onClick={() => setIsOpen(!isOpen)}>
        <div className={s.titles}>
          <p
            className={
              themeWhite
                ? isElementActive
                  ? s.titleWhite
                  : `${s.titleWhite} ${s.inactive}`
                : isElementActive
                ? s.title
                : `${s.title} ${s.inactive}`
            }
          >
            {title}
          </p>
          <p
            className={
              themeWhite
                ? isElementActive
                  ? s.numberWhite
                  : `${s.numberWhite} ${s.inactive}`
                : isElementActive
                ? s.number
                : `${s.number} ${s.inactive}`
            }
          >
            {number}
          </p>
        </div>
        <div
          className={
            themeWhite
              ? isElementActive
                ? s.tumblerWhite
                : `${s.tumblerWhite} ${s.inactive}`
              : isElementActive
              ? s.tumbler
              : `${s.tumbler} ${s.inactive}`
          }
        >
          {isOpen ? "-" : "+"}
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.p
            className={s.textWrapper}
            variants={textAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <MaskText words={[text]} className={s.text} />
          </motion.p>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Answer;
