import { FC, useState } from "react";
import s from "./Faq.module.scss";
import Planet from "@/components/ui/Planet/Planet";
import { TypeAnimation } from "react-type-animation";
import SplitTextScreen from "@/components/animate/SplitText/SplitText2";
import Button from "@/components/animate/Button/Button";
import { motion } from "framer-motion";
import { bottomToTop } from "@/assets/animations/animations";
import { useMediaQuery } from "react-responsive";
import Symbol from "@/components/animate/Symbol/Symbol";
import Answer from "./Answer/Answer";
import { faqs } from "./Faq.data";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";

const generateFaqJsonLd = (lang: "ru" | "en") => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: lang === "ru" ? item.title : item.titleEn,
    acceptedAnswer: {
      "@type": "Answer",
      text: lang === "ru" ? item.text : item.textEn,
    },
  })),
});

const Faq: FC<{ themeWhite?: boolean }> = ({ themeWhite }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 1350px)" });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleHover = (index: number, isHovered: boolean) => {
    setActiveIndex(isHovered ? index : null);
  };

  const { lang } = useTranslation("common");

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateFaqJsonLd(lang as "ru" | "en")),
          }}
        />
      </Head>

      <motion.section
        className={themeWhite ? s.faqWhite : s.faq}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={1}
        variants={bottomToTop}
      >
        <div className={s.content}>
          <div className={s.titles}>
            {isMobile ? (
              <p className={themeWhite ? s.titleWhite : s.title}>FAQ</p>
            ) : (
              <Symbol
                text="FAQ"
                className={themeWhite ? s.titleWhite : s.title}
              />
            )}
            <SplitTextScreen
              text="Answers to the most popular questions"
              className={s.subtitle}
            />
          </div>
          <div itemScope itemType="https://schema.org/FAQPage">
            <div className={s.items}>
              {faqs.map((item, index) => (
                <Answer
                  key={index}
                  {...item}
                  themeWhite={themeWhite}
                  isActive={activeIndex === index}
                  onHover={(isHovered) => handleHover(index, isHovered)}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default Faq;
