import { FC, memo, useMemo, useCallback } from "react";
import s from "./Name.module.scss";
import arrow from "@/assets/images/arrowLeft.svg";
import Image from "next/image";
import Symbol from "@/components/animate/Symbol/Symbol";
import { motion } from "framer-motion";
import { leftToRight } from "@/assets/animations/animations";
import { TypeAnimation } from "react-type-animation";
import SplitTextScreen from "@/components/animate/SplitText/SplitText2";
import { Texts } from "./Texts.data";
import HoverText from "@/components/animate/HoverNav/HoverNav";
import Link from "next/link";
import { StaggeredFade } from "@/components/animate/StaggeredText/StaggeredText";
import useTranslation from "next-translate/useTranslation";
import { useMediaQuery } from "react-responsive";
import MaskText from "@/components/animate/MaskText/MaskText";

interface NameProps {
  name: string;
  nameEn: string;
  subtitle: string;
  subtitleEn: string;
  relized: string;
  relizedEn: string;
  priceText: any;
  deadlineText: any;
  defaultText: any;
}

const Name: FC<NameProps> = memo(({
  name,
  nameEn,
  subtitle,
  subtitleEn,
  relized,
  relizedEn,
  priceText,
  deadlineText,
  defaultText,
}) => {
  const isMobile = useMediaQuery({ query: "(max-width: 1350px)" });
  const { t, lang } = useTranslation("common");

  // Мемоизируем локализованные тексты
  const localizedName = useMemo(() => lang === "en" ? nameEn : name, [lang, nameEn, name]);
  const localizedRelized = useMemo(() => lang === "en" ? relizedEn : relized, [lang, relizedEn, relized]);
  
  // Мемоизируем навигационную ссылку
  const navComponent = useMemo(() => (
    <motion.div custom={1} variants={leftToRight}>
      <Link className={s.nav} href="/services">
        <Image className={s.arrow} src={arrow} alt="arrow" />
        <HoverText text={t("service.nav")} />
      </Link>
    </motion.div>
  ), [t]);

  // Мемоизируем массивы для рендера
  const priceItems = useMemo(() => 
    priceText?.map((item: any, index: number) => (
      <StaggeredFade 
        text={lang === "en" ? item.button : item.buttonEn} 
        key={`price-${index}`} 
        className={s.text} 
      />
    )), [priceText, lang]
  );

  const deadlineItems = useMemo(() => 
    deadlineText?.map((item: any, index: number) => (
      <StaggeredFade 
        text={lang === "en" ? item.button : item.buttonEn} 
        key={`deadline-${index}`} 
        className={s.text} 
      />
    )), [deadlineText, lang]
  );

  const defaultItems = useMemo(() => 
    defaultText?.map((item: any, index: number) => (
      <StaggeredFade 
        text={lang === "en" ? item.button : item.buttonEn} 
        key={`default-${index}`} 
        className={s.text} 
      />
    )), [defaultText, lang]
  );

  // Мемоизируем заголовочную секцию
  const titleSection = useMemo(() => {
    const staticSubtitle = "If you still have questions, contact us at contacts, we'll help you figure it out!";
    
    if (isMobile) {
      return (
        <div className={s.titles}>
          <p className={s.title}>{localizedName}</p>
          <SplitTextScreen
            text={staticSubtitle}
            className={s.subtitle}
          />
        </div>
      );
    }
    
    return (
      <div className={s.titles}>
        <MaskText
          className={s.title}
          words={[localizedName]}
          amount={0}
        />
        <SplitTextScreen
          text={staticSubtitle}
          className={s.subtitle}
        />
      </div>
    );
  }, [isMobile, localizedName]);

  // Мемоизируем секцию с элементами
  const itemsSection = useMemo(() => (
    <div className={s.items}>
      <div className={s.item}>
        <p className={s.paragraph}>{t("service.previewText")}</p>
        {priceItems}
      </div>
      <div className={s.item}>
        <p className={s.paragraph}>{t("service.previewText2")}</p>
        {deadlineItems}
      </div>
      <div className={s.item}>
        <p className={s.paragraph}>{t("service.previewText3")}</p>
        {defaultItems}
      </div>
    </div>
  ), [t, priceItems, deadlineItems, defaultItems]);

  return (
    <motion.section className={s.name} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
      <div className={s.content}>
        {navComponent}
        <motion.span className={s.relized} custom={2} variants={leftToRight}>
          {localizedRelized}
        </motion.span>
        {titleSection}
      </div>
      {itemsSection}
    </motion.section>
  );
});

Name.displayName = 'Name';

export default Name;
