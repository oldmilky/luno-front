import { FC } from "react";
import s from "./Name.module.scss";
import arrow from "@/assets/images/arrowLeft.svg";
import Image from "next/image";
import Symbol from "@/components/animate/Symbol/Symbol";
import { motion } from "framer-motion";
import { leftToRight } from "@/assets/animations/animations";
import { TypeAnimation } from "react-type-animation";
import SplitTextScreen from "@/components/animate/SplitText/SplitText2";
import HoverText from "@/components/animate/HoverNav/HoverNav";
import Link from "next/link";
import MaskText from "@/components/animate/MaskText/MaskText";
import useTranslation from "next-translate/useTranslation";

const Name: FC<{
  name: string;
  nameEn: string;
  date: string;
  typeService: string;
  develop: boolean;
  design: boolean;
}> = ({ name, nameEn, date, typeService, develop, design }) => {
  const { t, lang } = useTranslation("common");

  return (
    <motion.section
      className={s.name}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div custom={1} variants={leftToRight}>
        <Link className={s.nav} href="/cases">
          <Image className={s.arrow} src={arrow} alt="arrow" />
          <HoverText text={t("service.nav")} />
        </Link>
      </motion.div>
      {/* <motion.div custom={1} variants={leftToRight}>
        <Link className={s.nav} href="/cases">
          <Image className={s.arrow} src={arrow} alt="arrow" />
          <HoverText text={t("service.nav")} />
        </Link>
      </motion.div> */}
      <h1 className={s.titles}>
        <MaskText
          className={name.length > 7 ? s.titleLength : s.title}
          words={[lang === "ru" ? name : nameEn]}
          amount={0}
        />
        <motion.span className={s.date} custom={1.5} variants={leftToRight}>
          ©{date}
        </motion.span>
      </h1>
      <div className={s.tags}>
        {typeService ? (
          <SplitTextScreen text={`#${typeService}`} className={s.tag} />
        ) : null}
        {design ? <SplitTextScreen text={"#ДИЗАЙН"} className={s.tag} /> : null}
        {develop ? (
          <SplitTextScreen text={"#РАЗРАБОТКА"} className={s.tag} />
        ) : null}
      </div>
      <p className={s.goon}>{t("case.goon")}</p>
    </motion.section>
  );
};

export default Name;
