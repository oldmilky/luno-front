import { FC } from "react";
import { motion } from "framer-motion";
import s from "./Collection.module.scss";
import Image from "next/image";
import { collection } from "./Collection.data";
import Paragraph from "@/components/animate/TextGradient/TextGradient";
import Symbol from "@/components/animate/Symbol/Symbol";
import { leftToRight, rightToLeft } from "@/assets/animations/animations";
import SplitText from "@/components/animate/SplitText/SplitText";
import SplitTextScreen from "@/components/animate/SplitText/SplitText2";
import Button from "@/components/animate/Button/Button";
import { useMediaQuery } from "react-responsive";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { IProject } from "@/interfaces/project.interface";

const Collection: FC<{ projects: IProject[] }> = ({ projects }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 1425px)" });

  const { t, lang } = useTranslation("common");

  const mobileLeftToRight = {
    hidden: {
      x: isMobile ? -20 : -45,
      opacity: 0,
    },
    visible: (custom: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: custom * 0.15,
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
        type: "spring",
        stiffness: 50,
      },
    }),
  };

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
    <motion.section
      className={s.collection}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className={s.content}>
        {isMobile ? (
          <div className={s.titles}>
            <p className={s.title}>{t("collection.title")}</p>
            <p className={s.title2}>{t("collection.title2")}</p>
            <SplitTextScreen
              text="we gathered our best projects here, to see them all, scroll below"
              className={s.subtitle}
            />
          </div>
        ) : (
          <div className={s.titles}>
            <Symbol text={t("collection.title")} className={s.title} />
            <Symbol text={t("collection.title2")} className={s.title2} />
            <SplitTextScreen
              text="we gathered our best projects here, to see them all, scroll below"
              className={s.subtitle}
            />
          </div>
        )}
        <div className={s.container}>
          {projects
            .sort((a, b) => (a.sort || 0) - (b.sort || 0))
            .slice(0, 4)
            .map((item, i) => (
              <motion.div
                className={s.card}
                key={i}
                custom={1.2 + i * 0.2}
                variants={i % 2 === 0 ? mobileLeftToRight : mobileRightToLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <Image
                  className={s.image}
                  src={item.image}
                  alt="mock"
                  width={480}
                  height={270}
                  sizes="(max-width: 915px) 100vw, 480px"
                  draggable={false}
                />
                <div className={s.items}>
                  <p className={s.itemTitle}>
                    {lang === "ru" ? item.name : item.nameEn}
                  </p>
                  {isMobile ? (
                    <p className={s.text}>
                      {lang === "ru" ? item.subtitle : item.subtitleEn}
                    </p>
                  ) : (
                    <Paragraph
                      paragraph={
                        lang === "ru" ? item.subtitle : item.subtitleEn
                      }
                      className={s.text}
                    />
                  )}
                  <div className={s.tags}>
                    {/* {item.tags.slice(0, 4).map((tag, index) => (
                    <SplitText className={s.tag} text={tag} key={index} />
                  ))} */}
                    <SplitText className={s.tag} text={item.techs} key={i} />
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
        <Link href="/cases">
          <Button buttonClass={s.view} circleClass={s.circle}>
            {t("collection.button")}
          </Button>
        </Link>
      </div>
    </motion.section>
  );
};

export default Collection;
