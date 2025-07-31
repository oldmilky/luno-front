import { FC } from "react";
import s from "./Desc.module.scss";
import { motion } from "framer-motion";
import Symbol from "@/components/animate/Symbol/Symbol";
import { texts } from "./Desc.data";
import gsap from "gsap";
import { bottomToTop } from "@/assets/animations/animations";
import useTranslation from "next-translate/useTranslation";
import { useMediaQuery } from "react-responsive";

const Desc: FC<{ texts: any }> = ({ texts }) => {
  const manageMouseEnter = (e: any, index: any) => {
    gsap.to(e.target, {
      top: "-35px",
      duration: 0.5,
      zIndex: 2,
      ease: "power2.out",
      overwrite: true,
      backgroundColor: "#3b424e",
    });
  };

  const manageMouseLeave = (e: any, index: any) => {
    gsap.to(e.target, {
      top: "0",
      backgroundColor: "#131316",
      duration: 0.5,
      delay: 0.1,
      zIndex: 1,
      ease: "power2.inOut",
      overwrite: true,
    });
  };

  const isMobile = useMediaQuery({ query: "(max-width: 1350px)" });
  const { t, lang } = useTranslation("common");

  console.log(texts);

  return (
    <motion.section
      className={s.desc}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {isMobile ? (
        <p className={s.title}>{t("order.order2")}</p>
      ) : (
        <Symbol text={t("order.order2")} className={s.title} />
      )}
      {isMobile ? (
        <div className={s.content}>
          {texts?.map((t: any, index: any) => (
            <motion.div
              className={s.itemsMobile}
              key={index}
              custom={1.2 + index * 0.2}
              variants={index % 2 === 0 ? bottomToTop : bottomToTop}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <p className={s.numberMobile}>{t.number}</p>
              <p className={s.textMobile}>
                {lang === "en" ? t.button : t.buttonEn}
              </p>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className={s.content}>
          {texts?.map((t: any, index: any) => (
            <motion.div
              className={s.items}
              onMouseEnter={(e) => {
                manageMouseEnter(e, index);
              }}
              onMouseLeave={(e) => {
                manageMouseLeave(e, index);
              }}
              key={index}
              custom={1.2 + index * 0.2}
              variants={index % 2 === 0 ? bottomToTop : bottomToTop}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <p className={s.number}>{t.number}</p>
              <p className={s.text}>{lang === "en" ? t.button : t.buttonEn}</p>
            </motion.div>
          ))}
        </div>
      )}
    </motion.section>
  );
};

export default Desc;
