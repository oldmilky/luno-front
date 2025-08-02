import { FC, useState } from "react";
import s from "./Answer.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { AnswerProps } from "./Answer.interface";
import MaskText from "@/components/animate/MaskText/MaskText";
import useTranslation from "next-translate/useTranslation";

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
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

const Answer: FC<AnswerProps> = ({
  title,
  titleEn,
  number,
  text,
  textEn,
  themeWhite,
  isActive,
  onHover,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const isElementActive = isActive || isOpen;

  const { lang } = useTranslation("common");

  return (
    <motion.section
      className={themeWhite ? s.answerWhite : s.answer}
      onHoverStart={() => onHover(true)}
      onHoverEnd={() => onHover(false)}
    >
      <div
        className={s.content}
        onClick={() => setIsOpen(!isOpen)}
        itemScope
        itemProp="mainEntity"
        itemType="https://schema.org/Question"
      >
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
            itemProp="name"
          >
            {lang === "ru" ? title : titleEn}
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
            key="animated-answer"
            className={s.textWrapper}
            variants={textAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            itemScope
            itemProp="acceptedAnswer"
            itemType="https://schema.org/Answer"
          >
            <span itemProp="text">
              <MaskText
                words={[lang === "ru" ? text : textEn]}
                className={s.text}
              />
            </span>
          </motion.p>
        )}
      </AnimatePresence>

      <p
        className={s.textWrapper}
        itemScope
        itemProp="acceptedAnswer"
        itemType="https://schema.org/Answer"
        aria-hidden="true"
        style={{ display: "none" }}
      >
        <span itemProp="text">{lang === "ru" ? text : textEn}</span>
      </p>
    </motion.section>
  );
};

export default Answer;
