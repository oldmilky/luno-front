import { FC, useState } from "react";
import s from "./About.module.scss";
import { motion } from "framer-motion";
import Paragraph from "@/components/animate/TextGradient/TextGradient";
import Symbol from "@/components/animate/Symbol/Symbol";
import { leftToRight, rightToLeft } from "@/assets/animations/animations";
import SplitTextScreen from "@/components/animate/SplitText/SplitText2";
import Button from "@/components/animate/Button/Button";
import { useMediaQuery } from "react-responsive";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { Element } from "react-scroll";
const About: FC = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 1350px)" });

  const { t, lang } = useTranslation("common");

  const mobileRightToLeft = {
    hidden: {
      x: isMobile ? 20 : 45,
      opacity: 0,
    },
    visible: (custom: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: custom * 0.15,
        duration: 0.4,
        ease: [0.1, 1, 0.3, 1],
        type: "spring",
        stiffness: 50,
      },
    }),
  };

  return (
    <Element name="aboutme">
      <motion.section
        className={s.about}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className={s.content}>
          {isMobile ? (
            <div className={s.titles}>
              <p className={s.title}>{t("aboutHome.title")}</p>
              <p className={s.title2}>{t("aboutHome.title2")}</p>
              <SplitTextScreen
                text="we position ourselves as premium quality of service"
                className={s.subtitle}
              />
            </div>
          ) : (
            <div className={s.titles}>
              <Symbol text={t("aboutHome.title")} className={s.title} />
              <Symbol text={t("aboutHome.title2")} className={s.title2} />
              <SplitTextScreen
                text="we position ourselves as premium quality of service"
                className={s.subtitle}
              />
            </div>
          )}
          <div className={s.container}>
            <motion.div custom={2.5} variants={leftToRight}>
              <Link href="/contacts">
                <Button
                  buttonClass={s.button}
                  textClass={s.text}
                  circleClass={s.circle}
                >
                  {t("services.order")}
                </Button>
              </Link>
            </motion.div>
            <div className={s.wrap}>
              <motion.div custom={2} variants={mobileRightToLeft}>
                <Paragraph paragraph={t("aboutHome.text")} className={s.text} />
              </motion.div>
              <motion.div custom={2.5} variants={mobileRightToLeft}>
                <Paragraph
                  paragraph={t("aboutHome.text2")}
                  className={s.text}
                />
              </motion.div>
              <motion.div custom={3} variants={mobileRightToLeft}>
                <Paragraph
                  paragraph={t("aboutHome.text3")}
                  className={s.text}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
    </Element>
  );
};

export default About;
