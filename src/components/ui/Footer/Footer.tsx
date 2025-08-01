import { FC, useRef } from "react";
import s from "./Footer.module.scss";
import Link from "next/link";
import Symbol from "@/components/animate/Symbol/Symbol";
import { motion, useScroll, useTransform } from "framer-motion";
import SplitTextScreen from "@/components/animate/SplitText/SplitText2";
import SplitText from "@/components/animate/SplitText/SplitText";
import {
  bottomToTopFooter,
  leftToRight,
  rightToLeft,
} from "@/assets/animations/animations";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import { Links, navItems } from "./Links";
import Image from "next/image";

const Footer: FC = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 1350px)" });
  const pathname = useRouter();

  const isContacts = pathname.pathname === "/contacts";

  const { t, lang } = useTranslation("common");

  return (
    <motion.footer
      className={s.footer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {!isContacts && (
        <div className={s.wrap}>
          {isMobile ? (
            <p className={s.title}>{t("footer.title")}</p>
          ) : (
            <Symbol text={t("footer.title")} className={s.title} />
          )}
          <SplitTextScreen
            text="Follow us on social media to stay updated"
            className={s.subtitle}
          />
          <SplitTextScreen
            text="on the progress of our project"
            className={s.subtitle2}
          />
        </div>
      )}
      {!isContacts && (
        <div className={s.container}>
          <motion.div className={s.wrapper} custom={1.7} variants={leftToRight}>
            {navItems.map((item) => (
              <Link href={item.href} className={s.text} key={item.href}>
                {lang === "en" ? item.titleEn : item.title}
              </Link>
            ))}
          </motion.div>
          <motion.div
            className={s.wrapperNetworks}
            custom={1.7}
            variants={rightToLeft}
          >
            {Links.map((item) => (
              <Link className={s.link} href={item.link} target="_blank" key={item.text}>
                <SplitText className={s.network} text={item.text} />
                <Image width={20} height={20} src={item.logo} alt={item.text} />
              </Link>
            ))}
          </motion.div>
        </div>
      )}
      {!isContacts && <div className={s.line} />}
      <motion.div
        className={s.authors}
        custom={1.7}
        variants={bottomToTopFooter}
      >
        <p className={s.authorText}>
          © 2025 LUNOWEB.COM <div className={s.lines} /> {t("footer.author")}
        </p>
        <p className={s.authorText}>
          {t("footer.author2")} <div className={s.lines} />
          LUNOWEB@GMAIL.COM
        </p>
      </motion.div>
      <div className={s.luno}>
        <p className={s.lunoText}>LUNOWEB</p>
      </div>
    </motion.footer>
  );
};

export default Footer;
