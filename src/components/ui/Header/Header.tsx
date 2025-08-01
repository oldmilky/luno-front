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
import { Link as LinkTo, scroller } from "react-scroll";

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
    linkTo: true,
  },
  {
    title: "РАЗРАБОТКА",
    titleEn: "DEVELOPMENT",
    href: "/development",
    linkTo: true,
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

  const router = useRouter();

  const handleAboutClick = () => {
    if (router.pathname !== "/") {
      router.push("/").then(() => {
        scroller.scrollTo("aboutme", {
          duration: 500,
          delay: 0,
          smooth: true,
          offset: -100,
        });
      });
    } else {
      scroller.scrollTo("aboutme", {
        duration: 500,
        delay: 0,
        smooth: true,
        offset: -100,
      });
    }
  };

  const handleDevelopmentClick = () => {
    if (router.pathname !== "/") {
      router.push("/").then(() => {
        scroller.scrollTo("development", {
          duration: 500,
          delay: 0,
          smooth: true,
          offset: 0,
        });
      });
    } else {
      scroller.scrollTo("development", {
        duration: 500,
        delay: 0,
        smooth: true,
        offset: 0,
      });
    }
  };

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
          {navItems.map((data, index) => {
            const isActive = pathname === data.href;
            const textClasses = `${s.text} ${isActive && s.active} ${
              pathname.startsWith("/blog") && s.textWhite
            } ${isActive && pathname.startsWith("/blog") && s.activeWhite}`;

            if (data.linkTo) {
              const handleClick = data.href === "/about" ? handleAboutClick : data.href === "/development" ? handleDevelopmentClick : undefined;
              
              return (
                <LinkTo
                  key={index}
                  to={data.href.replace("/", "")}
                  spy={true}
                  smooth={true}
                  offset={data.href === "/about" ? 1100 : 0}
                  duration={500}
                  className={textClasses}
                  onClick={handleClick}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  <AnimatePresence>
                    {(activeIndex === index || isActive) && (
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
                </LinkTo>
              );
            }

            return (
              <Link
                key={index}
                href={data.href}
                className={textClasses}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <AnimatePresence>
                  {(activeIndex === index || isActive) && (
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
            );
          })}
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
