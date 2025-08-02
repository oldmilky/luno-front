import { FC } from "react";
import s from "./Preview.module.scss";
import { motion } from "framer-motion";
import { bottomToTop } from "@/assets/animations/animations";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import Button from "@/components/animate/Button/Button";
import {
  DynamicTypeAnimation,
  DynamicSplitText,
  DynamicPlanet,
} from "@/utils/dynamicImports";

const Preview: FC = () => {
  const { t, lang } = useTranslation("common");

  return (
    <motion.section
      className={s.preview}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={1}
      variants={bottomToTop}
    >
      <DynamicTypeAnimation
        key={lang} // Принудительный перерендер при смене языка
        sequence={[
          `LUNO ${t("preview.sites")}`,
          `LUNO ${t("preview.sites")}`,
          3000,
          `LUNO ${t("preview.designs")}`,
          3000,
          `LUNO ${t("preview.projects")}`,
          3000,
        ]}
        wrapper="span"
        speed={10}
        className={s.title}
        repeat={Infinity}
      />
      <h1 className={s.title2}>{`LUNO ${t("preview.sites")} ${t(
        "preview.designs"
      )}`}</h1>
      <div className={s.planet}>
        <DynamicPlanet />
      </div>
      <Link href="/contacts">
        <Button
          buttonClass={s.button}
          textClass={s.text}
          circleClass={s.circle}
        >
          {t("order.order")}
        </Button>
      </Link>
      <DynamicSplitText
        text="We are Luno, we will create a dream site and design for you."
        className={s.subtitle}
      />
      <p className={s.subtitle2}>
        We are Luno, we will create a dream site and design for you.
      </p>
    </motion.section>
  );
};

export default Preview;
