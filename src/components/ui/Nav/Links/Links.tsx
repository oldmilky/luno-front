import React, { FC, useState } from "react";
import s from "./Links.module.scss";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { menuSlide } from "../anim";
import Curve from "../Curve/Curve";
import { slide, scale } from "../anim";
import Image from "next/image";
import telegram from "@/assets/images/telegram.svg";
import discord from "@/assets/images/discord.svg";
import whatsapp from "@/assets/images/whatsapp.svg";
import Link from "next/link";
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
    title: "ЗАКАЗАТЬ",
    titleEn: "ORDER NOW",
    href: "/contacts",
  },
];

const Links: FC = () => {
  const pathname = usePathname();
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);
  const { lang } = useTranslation();

  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className={s.links}
    >
      <div className={s.content}>
        <div
          onMouseLeave={() => {
            setSelectedIndicator(pathname);
          }}
          className={s.nav}
        >
          <p className={s.subtitle}>Navigation</p>
          <div className={s.line} />
          <div className={s.container}>
            {navItems.map((data, index) => {
              return (
                <motion.div
                  className={s.link}
                  onMouseEnter={() => {
                    setSelectedIndicator(data.href);
                  }}
                  custom={index}
                  variants={slide}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  key={index}
                >
                  <Link href={data.href} className={s.link}>
                    <motion.div
                      variants={scale}
                      animate={
                        selectedIndicator == data.href ? "open" : "closed"
                      }
                      className={s.indicator}
                    ></motion.div>
                    <p className={s.title}>{lang === "en" ? data.titleEn : data.title}</p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
          <div className={s.line2} />
          <div className={s.contacts}>
            <div className={s.contact}>
              <Image
                className={s.telegram}
                width={20}
                height={20}
                src={telegram}
                alt="telegram"
              />
              TELEGRAM
            </div>
            <div className={s.contact}>
              <Image
                className={s.discord}
                width={22}
                height={22}
                src={discord}
                alt="discord"
              />
              DISCORD
            </div>

            <div className={s.contact}>
              <Image
                className={s.whatsapp}
                width={19}
                height={19}
                src={whatsapp}
                alt="whatsapp"
              />
              WHATSAPP
            </div>
          </div>
        </div>
      </div>
      <Curve />
    </motion.div>
  );
};

export default Links;
