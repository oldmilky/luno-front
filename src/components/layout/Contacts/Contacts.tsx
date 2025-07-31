import { FC } from "react";
import s from "./Contacts.module.scss";
import Symbol from "@/components/animate/Symbol/Symbol";
import SplitTextScreen from "@/components/animate/SplitText/SplitText2";
import { useMediaQuery } from "react-responsive";
import Form from "./Form/Form";
import { motion } from "framer-motion";
import Links from "./Links/Links";
import useTranslation from "next-translate/useTranslation";

const Contacts: FC = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 1350px)" });

  const { t, lang } = useTranslation("common");

  return (
    <motion.section
      className={s.contacts}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className={s.titlesContent}>
        {isMobile ? (
          <div className={s.titles}>
            <p className={s.title}>{t("contacts.title")}</p>
            <p className={s.title}>{t("contacts.title2")}</p>
          </div>
        ) : (
          <div className={s.titles}>
            <Symbol text={t("contacts.title")} className={s.title} />
            <Symbol text={t("contacts.title2")} className={s.title} />
          </div>
        )}
        <SplitTextScreen text="Don't wait!" className={s.subtitle} />
        <SplitTextScreen text="Step forward!" className={s.subtitle2} />
      </div>
      <div className={s.content}>
        <Form />
        <Links />
      </div>
    </motion.section>
  );
};

export default Contacts;
