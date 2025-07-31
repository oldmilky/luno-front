import { FC, useRef, useMemo, useCallback } from "react";
import s from "./Process.module.scss";
import Symbol from "@/components/animate/Symbol/Symbol";
import { motion } from "framer-motion";
import SplitTextScreen from "@/components/animate/SplitText/SplitText2";
import dynamic from "next/dynamic";
import { leftToRight, rightToLeft } from "@/assets/animations/animations";
import { useMediaQuery } from "react-responsive";
import useTranslation from "next-translate/useTranslation";

const Process: FC = () => {
  const ParagraphDynamic = useMemo(
    () =>
      dynamic(() => import("@/components/animate/TextGradient/TextGradient"), {
        ssr: false,
      }),
    []
  );

  const isMobile = useMediaQuery({ query: "(max-width: 1350px)" });
  const { t } = useTranslation("common");

  const mobileLeftToRight = useMemo(() => ({
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
  }), [isMobile]);

  const mobileRightToLeft = useMemo(() => ({
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
        ease: [0.10, 1, 0.3, 1],
        type: "spring",
        stiffness: 50,
      },
    }),
  }), [isMobile]);

  const renderTitles = useCallback(() => {
    if (isMobile) {
      return (
        <div className={s.titles}>
          <p className={s.title}>{t("process.title")}</p>
          <p className={s.title2}>{t("process.title2")}</p>
          <SplitTextScreen
            text="It is important to realize that the process may vary, depending on your preferences!"
            className={s.subtitle}
          />
          <SplitTextScreen
            text="We always try to make it fast!"
            className={s.subtitle2}
          />
        </div>
      );
    }

    return (
      <div className={s.titles}>
        <Symbol text={t("process.title")} className={s.title} />
        <Symbol text={t("process.title2")} className={s.title2} />
        <SplitTextScreen
          text="It is important to realize that the process may vary, depending on your preferences!"
          className={s.subtitle}
        />
        <SplitTextScreen
          text="We always try to make it fast!"
          className={s.subtitle2}
        />
      </div>
    );
  }, [isMobile, t]);

  const renderProcessItem = useCallback(
    (
      number: string,
      subtitle: string,
      text: string,
      variants: typeof leftToRight | typeof rightToLeft,
      custom: number
    ) => (
      <motion.div className={s.item} custom={custom} variants={variants}>
        <div className={s.wrap}>
          <motion.p
            className={s.itemTitle}
            custom={custom + 0.2}
            variants={variants}
          >
            {subtitle}
          </motion.p>
          <motion.p custom={custom + 0.4} variants={variants}>
            <ParagraphDynamic paragraph={text} className={s.text} />
          </motion.p>
        </div>
        <p className={s.number}>{number}</p>
      </motion.div>
    ),
    [ParagraphDynamic]
  );

  const processItems = useMemo(
    () => [
      {
        number: "01",
        subtitle: t("process.subtitle"),
        text: t("process.text"),
        variants: mobileLeftToRight,
        custom: 1.5,
      },
      {
        number: "02",
        subtitle: t("process.subtitle2"),
        text: t("process.text2"),
        variants: mobileRightToLeft,
        custom: 1.5,
      },
      {
        number: "03",
        subtitle: t("process.subtitle3"),
        text: t("process.text3"),
        variants: mobileLeftToRight,
        custom: 2,
      },
      {
        number: "04",
        subtitle: t("process.subtitle4"),
        text: t("process.text4"),
        variants: mobileRightToLeft,
        custom: 2,
      },
      {
        number: "05",
        subtitle: t("process.subtitle5"),
        text: t("process.text5"),
        variants: mobileLeftToRight,
        custom: 2,
      },
      {
        number: "06",
        subtitle: t("process.subtitle6"),
        text: t("process.text6"),
        variants: mobileRightToLeft,
        custom: 2,
      },
    ],
    [t, mobileLeftToRight, mobileRightToLeft]
  );

  return (
    <motion.section
      className={s.process}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className={s.content}>
        {renderTitles()}
        <div className={s.container}>
          {processItems.map((item) =>
            renderProcessItem(
              item.number,
              item.subtitle,
              item.text,
              item.variants,
              item.custom
            )
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default Process;
