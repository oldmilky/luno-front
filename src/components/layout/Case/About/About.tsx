import { FC } from "react";
import s from "./About.module.scss";
import Symbol from "@/components/animate/Symbol/Symbol";
import { motion } from "framer-motion";
import { Abouts } from "./About.data";
import { leftToRight, rightToLeft } from "@/assets/animations/animations";
import MaskText from "@/components/animate/MaskText/MaskText";
import useTranslation from "next-translate/useTranslation";
import { ButtonPair } from "@/interfaces/project.interface";

const About: FC<{
  descText: ButtonPair[];
  techText: ButtonPair[];
  resultText: ButtonPair[];
}> = ({ descText, techText, resultText }) => {
  const { t, lang } = useTranslation("common");

  return (
    <motion.section
      className={s.about}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <MaskText className={s.title} words={[t("case.title2")]} amount={0} />
      <div className={s.items}>
        <div className={s.item}>
          <div className={s.content}>
            <motion.div
              className={s.container}
              custom={1.5}
              variants={leftToRight}
            >
              <div className={s.number}>01</div>
              <p className={s.subtitle}>{t("case.about")}</p>
            </motion.div>
            <motion.div className={s.texts}>
              {descText.map((item, index) => (
                <MaskText
                  key={index}
                  words={[lang === "ru" ? item.button : item.buttonEn]}
                  className={s.text}
                  amount={0.5}
                />
              ))}
            </motion.div>
          </div>
        </div>

        <div className={s.item}>
          <div className={s.content}>
            <motion.div
              className={s.container}
              custom={1.9}
              variants={leftToRight}
            >
              <div className={s.number}>02</div>
              <p className={s.subtitle}>{t("case.about2")}</p>
            </motion.div>
            <motion.div className={s.texts}>
              {techText.map((item, index) => (
                <MaskText
                  key={index}
                  words={[lang === "ru" ? item.button : item.buttonEn]}
                  className={s.text}
                  amount={0.5}
                />
              ))}
            </motion.div>
          </div>
        </div>

        <div className={s.item}>
          <div className={s.content}>
            <motion.div
              className={s.container}
              custom={2.3}
              variants={leftToRight}
            >
              <div className={s.number}>03</div>
              <p className={s.subtitle}>{t("case.about3")}</p>
            </motion.div>
            <motion.div className={s.texts}>
              {resultText.map((item, index) => (
                <MaskText
                  key={index}
                  words={[lang === "ru" ? item.button : item.buttonEn]}
                  className={s.text}
                  amount={0.5}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
