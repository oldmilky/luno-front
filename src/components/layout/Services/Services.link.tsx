import s from "./Services.module.scss";
import { motion } from "framer-motion";
import { mountAnim, rotateX } from "./Services.anim";
import Image from "next/image";
import { FC, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

interface ServicesLinkProps {
  name: string;
  nameEn: string;
  subtitle: string;
  subtitleEn: string;
  texts: any;
  number: string;
  done?: string;
  index: number;
  reverse?: boolean;
  slug: string;
}

const ServicesLink: FC<ServicesLinkProps> = ({
  name,
  nameEn,
  subtitle,
  subtitleEn,
  texts,
  number,
  done,
  index,
  reverse,
  slug,
}) => {
  const outer = useRef(null);
  const inner = useRef(null);

  const manageMouseEnter = (e: any) => {
    const bounds = e.target.getBoundingClientRect();
    if (e.clientY < bounds.top + bounds.height / 2) {
      gsap.set(outer.current, { top: "-100%" });
      gsap.set(inner.current, { top: "100%" });
    } else {
      gsap.set(outer.current, { top: "100%" });
      gsap.set(inner.current, { top: "-100%" });
    }
    gsap.to(outer.current, { top: "0%", duration: 0.3 });
    gsap.to(inner.current, { top: "0%", duration: 0.3 });
  };

  const manageMouseLeave = (e: any) => {
    const bounds = e.target.getBoundingClientRect();
    if (e.clientY < bounds.top + bounds.height / 2) {
      gsap.to(outer.current, { top: "-100%", duration: 0.3 });
      gsap.to(inner.current, { top: "100%", duration: 0.3 });
    } else {
      gsap.to(outer.current, { top: "100%", duration: 0.3 });
      gsap.to(inner.current, { top: "-100%", duration: 0.3 });
    }
  };

  const { t, lang } = useTranslation("common");

  return (
    <motion.div
      onMouseEnter={manageMouseEnter}
      onMouseLeave={manageMouseLeave}
      variants={rotateX}
      {...mountAnim}
      custom={index}
      className={s.container}
    >
      {reverse ? (
        <Link href={`/service/${slug}`} className={s.wrapper}>
          <div className={s.descs}>
            <div className={s.done}>
              <p className={s.title}>{done}+</p>
              {done && <p className={s.text}>проектов</p>}
            </div>
            <p className={s.descriptionReverse}>
              {lang === "en" ? subtitleEn : subtitle}
            </p>
          </div>

          <div className={s.wrap}>
            <h1>{lang === "en" ? nameEn : name}</h1>
            <p className={s.numberReverse}>.0{number}</p>
          </div>
        </Link>
      ) : (
        <Link href={`/service/${slug}`} className={s.wrapper}>
          <div className={s.wrap}>
            <p className={s.number}>.0{number}</p>
            <h1>{lang === "en" ? nameEn : name}</h1>
          </div>

          <div className={s.descs}>
            <p className={s.description}>
              {lang === "en" ? subtitleEn : subtitle}
            </p>
            <div className={s.done}>
              <p className={s.title}>{done}+</p>
              {done && (
                <p className={s.text}>
                  {lang === "ru" ? "проектов" : "projects"}
                </p>
              )}
            </div>
          </div>
        </Link>
      )}

      <div ref={outer} className={s.outer}>
        <div ref={inner} className={s.inner}>
          {[...Array(2)].map((_, index) => {
            return (
              <div key={index} className={s.container}>
                {texts.map((t: any, m: any) => (
                  <p className={s.text} key={m}>
                    {" "}
                    * {lang === "en" ? t.button : t.buttonEn} *{" "}
                  </p>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default ServicesLink;
