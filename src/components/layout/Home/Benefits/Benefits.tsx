import { FC, useState } from "react";
import s from "./Benefits.module.scss";
import Symbol from "@/components/animate/Symbol/Symbol";
import { motion } from "framer-motion";
import { benefits } from "./Benefits.data";
import { leftToRight, rightToLeft } from "@/assets/animations/animations";
import { useMediaQuery } from "react-responsive";
import useTranslation from "next-translate/useTranslation";
import {
  DynamicTypeAnimation,
  DynamicSplitText,
  DynamicAnimatePresence,
} from "@/utils/dynamicImports";

const Benefits: FC = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const isMobile = useMediaQuery({ query: "(max-width: 1350px)" });
  const { t, lang } = useTranslation("common");

  return (
    <motion.section
      className={s.benefits}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className={s.content}>
        {isMobile ? (
          <div className={s.titles}>
            <p className={s.title}>{t("whyus.title")}</p>
            <p className={s.title2}>{t("whyus.title2")}</p>
            <DynamicSplitText
              text="There`s a reason for all of this!"
              className={s.subtitle}
            />
          </div>
        ) : (
          <div className={s.titles}>
            <Symbol text={t("whyus.title")} className={s.title} />
            <Symbol text={t("whyus.title2")} className={s.title2} />
            <DynamicSplitText
              text="There`s a reason for all of this!"
              className={s.subtitle}
            />
          </div>
        )}
      </div>
      <div className={s.container}>
        {benefits.map((b: any, i: any) => (
          <motion.div
            key={i}
            className={`${s.item} ${hoveredItem === b ? s.active : ""}`}
            onMouseEnter={() => setHoveredItem(b)}
            onMouseLeave={() => setHoveredItem(null)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className={s.wrapper}>
              <div className={s.wrap}>
                <motion.p
                  className={s.number}
                  animate={{
                    color: hoveredItem === b ? "#131316" : "#EBF9FF",
                  }}
                  transition={{ duration: 0.2 }}
                  custom={1.3 + i * 0.2}
                  variants={i % 2 === 0 ? leftToRight : leftToRight}
                >
                  {b.number}
                </motion.p>
                <DynamicAnimatePresence>
                  {hoveredItem === b && (
                    <motion.p
                      className={s.text}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <DynamicTypeAnimation
                        sequence={[lang === "ru" ? b.subtitle : b.subtitleEn]}
                        wrapper="span"
                        speed={90}
                        style={{
                          fontSize: "17px",
                          fontWeight: 600,
                          maxWidth: "700px",
                          textTransform: "uppercase",
                        }}
                      />
                    </motion.p>
                  )}
                </DynamicAnimatePresence>
              </div>
              <motion.p
                className={s.itemTitle}
                animate={{
                  color: hoveredItem === b ? "#131316" : "#EBF9FF",
                }}
                transition={{ duration: 0.2 }}
                custom={1.3 + i * 0.2}
                variants={i % 2 === 0 ? leftToRight : rightToLeft}
              >
                {lang === "ru" ? b.title : b.titleEn}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Benefits;
