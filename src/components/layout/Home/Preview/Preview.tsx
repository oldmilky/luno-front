import { FC } from "react";
import s from "./Preview.module.scss";
import Planet from "@/components/ui/Planet/Planet";
import { TypeAnimation } from "react-type-animation";
import SplitTextScreen from "@/components/animate/SplitText/SplitText2";
import Button from "@/components/animate/Button/Button";
import { motion } from "framer-motion";
import { bottomToTop } from "@/assets/animations/animations";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

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
      <TypeAnimation
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
        // cursor={false}
        // style={{
        //   fontSize: "130px",
        //   display: "inline-block",
        //   fontFamily: "Benzin",
        // }}
        className={s.title}
        repeat={Infinity}
      />
      <h1 className={s.title2}>{`LUNO ${t("preview.sites")} ${t(
        "preview.designs"
      )}`}</h1>
      <div className={s.planet}>
        <Planet />
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
      <SplitTextScreen
        text="We are Luno, we will create a dream website for you."
        className={s.subtitle}
      />
      <p className={s.subtitle2}>
        We are Luno, we will create a dream website for you.
      </p>
    </motion.section>
  );
};

export default Preview;
