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

type FilterType = "all" | "sites" | "designs";

interface FilterProps {
  activeFilter: FilterType;
  setActiveFilter: (filter: FilterType) => void;
}

const Filter: FC<FilterProps> = ({ activeFilter, setActiveFilter }) => {
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
        <Button
          buttonClass={activeFilter === "all" ? s.buttonActive : s.button}
          circleClass={s.circle}
          onClick={() => setActiveFilter("all")}
        >
          {t("portfolio.all")}
        </Button>
        <Button
          buttonClass={activeFilter === "sites" ? s.buttonActive : s.button}
          circleClass={s.circle}
          onClick={() => setActiveFilter("sites")}
        >
          {t("portfolio.sites")}
        </Button>
        <Button
          buttonClass={activeFilter === "designs" ? s.buttonActive : s.button}
          circleClass={s.circle}
          onClick={() => setActiveFilter("designs")}
        >
          {t("portfolio.designs")}
        </Button>
      </div>
    </motion.section>
  );
};

export default Filter;
