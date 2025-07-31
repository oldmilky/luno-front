import { FC, useEffect, useState } from "react";
import s from "./Header.module.scss";
import Image from "next/image";
import Link from "next/link";
import Nav from "../Nav/Nav";
import { AnimatePresence, motion } from "framer-motion";
import {
  leftToRightHeader,
  rightToLeftHeader,
  topToBottomHeader,
} from "@/assets/animations/animations";
import { useRouter } from "next/router";
import logo from "@/assets/images/logo.svg";
import logoWhite from "@/assets/images/logoWhite.svg";
import ShinyText from "@/components/animate/ShinyText/ShinyText";
import Languages from "../Languages/Languages";
import useTranslation from "next-translate/useTranslation";

const navItems = [
  {
    title: "НАШИ УСЛУГИ",
    titleEn: "OUR SERVICES",
    href: "/services",
  },
  {
    title: "ПОРТФОЛИО",
    titleEn: "PORTFOLIO",
    href: "/cases",
  },
  {
    title: "БЛОГ",
    titleEn: "BLOG",
    href: "/blogs",
  },
  {
    title: "КОМАНДА",
    titleEn: "OUR TEAM",
    href: "/team",
  },
  {
    title: "О НАС",
    titleEn: "ABOUT US",
    href: "/about",
  },
  {
    title: "РАЗРАБОТКА",
    titleEn: "DEVELOPMENT",
    href: "/development",
  },
];

const Header: FC = () => {
  const [showNav, setShowNav] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const { pathname } = useRouter();

  const { t, lang } = useTranslation("common");

  useEffect(() => {
    const handleScroll = () => {
      setShowNav(window.scrollY > 150);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <motion.header
        className={s.header}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div custom={1.7} variants={leftToRightHeader}>
          {pathname.startsWith("/blog") ? (
            <Link href="/" className={s.logos}>
              <Image className={s.logo} src={logoWhite} alt="logo" />
              <p className={s.titleWhite}>LUNOWEB</p>
            </Link>
          ) : (
            <Link href="/" className={s.logos}>
              <Image className={s.logo} src={logo} alt="logo" />
              <p className={s.title}>LUNOWEB</p>
            </Link>
          )}
        </motion.div>
        <motion.div
          className={s.container}
          custom={1.7}
          variants={topToBottomHeader}
        >
          {navItems.map((data, index) => (
            <Link
              href={data.href}
              className={`${s.text} ${pathname === data.href && s.active} ${
                pathname.startsWith("/blog") && s.textWhite
              } ${
                pathname === data.href &&
                pathname.startsWith("/blog") &&
                s.activeWhite
              }`}
              key={index}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.2,
                      ease: [0.1, 1, 0.2, 1],
                      type: "spring",
                      stiffness: 70,
                    }}
                    className={`${s.indicator} ${
                      pathname.startsWith("/blog") && s.indicatorWhite
                    }`}
                  />
                )}
              </AnimatePresence>
              {lang === "ru" ? data.title : data.titleEn}
            </Link>
          ))}
        </motion.div>
        <Link href="/contacts">
          <motion.button
            className={s.buttons}
            custom={1.7}
            variants={rightToLeftHeader}
          >
            <ShinyText
              text={t("header.contact")}
              speed={3}
              className={s.button}
            />
            {pathname === "/contacts" && <div className={s.lines} />}
          </motion.button>
        </Link>
      </motion.header>
      <AnimatePresence>{showNav && <Nav />}</AnimatePresence>
      <Languages />
    </>
  );
};

export default Header;
