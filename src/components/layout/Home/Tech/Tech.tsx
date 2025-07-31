import { FC } from "react";
import s from "./Tech.module.scss";
import Image from "next/image";
import logo from "@/assets/images/logo.svg";
import { motion } from "framer-motion";
import { bottomToTop } from "@/assets/animations/animations";
import { techBack, techFront } from "./Tech.data";
import useTranslation from "next-translate/useTranslation";

const Tech: FC = () => {
  const { t } = useTranslation("common");

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={s.tech}
    >
      <motion.div className={s.tech} custom={2} variants={bottomToTop}>
        <div className={s.containerRight}>
          <div className={`${s.wrapRight} ${s.techFrontMove}`}>
            {techBack.map((t) => (
              <div className={s.wrap} key={t.title}>
                <p className={s.titleRight}>
                  <Image src={t.icon} alt="icon" />#{t.title}
                </p>
                <p className={s.subtitle}>{t.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={s.containerLeft}>
          <div className={`${s.wrapLeft} ${s.techBackMove}`}>
            {techFront.map((t) => (
              <div className={s.wrap} key={t.title}>
                <p className={s.title}>
                  <Image src={t.icon} alt="icon" />#{t.title}
                </p>
                <p className={s.subtitle}>{t.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Tech;
