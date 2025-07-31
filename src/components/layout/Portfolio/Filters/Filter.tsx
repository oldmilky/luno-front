"use client";
import { FC, useState } from "react";
import s from "./Filter.module.scss";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import useTranslation from "next-translate/useTranslation";
import Button from "@/components/animate/Button/Button";
import typeLines from "@/assets/images/typeLines.svg";
import typeMore from "@/assets/images/typeMore.svg";
import Image from "next/image";

const Filter: FC = () => {
  const [modal, setModal] = useState({ active: false, index: 0 });
  const isMobile = useMediaQuery({ query: "(max-width: 1425px)" });
  const { t, lang } = useTranslation("common");

  return (
    <motion.section
      className={s.filter}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className={s.container}>
        <Button buttonClass={s.buttonActive} circleClass={s.circle}>
          {t("portfolio.all")}
        </Button>
        <Button buttonClass={s.button} circleClass={s.circle}>
          {t("portfolio.sites")}
        </Button>
        <Button buttonClass={s.button} circleClass={s.circle}>
          {t("portfolio.designs")}
        </Button>
      </div>
      {/* <div className={s.types}>
        <Button buttonClass={s.typeActive} circleClass={s.circle}>
          <Image src={typeLines} alt="typeLines" />
        </Button>
        <Button buttonClass={s.type} circleClass={s.circle}>
          <Image src={typeMore} alt="typeMore" />
        </Button>
      </div> */}
    </motion.section>
  );
};

export default Filter;
