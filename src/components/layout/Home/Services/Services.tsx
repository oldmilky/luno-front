import { FC, useEffect, useRef, useState, useMemo, useCallback } from "react";
import s from "./Services.module.scss";
import { design, develop } from "./Service.data";
import Symbol from "@/components/animate/Symbol/Symbol";
import { motion } from "framer-motion";
import SplitTextScreen from "@/components/animate/SplitText/SplitText2";
import Button from "@/components/animate/Button/Button";
import dynamic from "next/dynamic";
import { useMediaQuery } from "react-responsive";
import useTranslation from "next-translate/useTranslation";
// Use optimized dynamic imports
import { loadGSAP } from "@/utils/dynamicImports";
import Modal from "./Modal/Modal";
import Link from "next/link";
import { IService } from "@/interfaces/service.interface";

const scaleAnimation = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.3, ease: [0.8, 0, 0.24, 1] },
  },
  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.3, ease: [0.7, 0, 0.67, 0] },
  },
};

const Services: FC<{ services: IService[] }> = ({ services }) => {
  const CountUpDynamic = useMemo(
    () =>
      dynamic(() => import("@/components/animate/CountUp/CountUp"), {
        ssr: false,
      }),
    []
  );

  const isMobile = useMediaQuery({ query: "(max-width: 1350px)" });

  const [modal, setModal] = useState({ active: false, index: 0 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const { active, index } = modal;
  const modalContainer = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);

  const gsapRef = useRef<any>(null);

  // Load GSAP dynamically
  useEffect(() => {
    loadGSAP().then((gsap) => {
      gsapRef.current = gsap;
    });
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { pageX, pageY } = e;
    if (modalContainer.current && cursor.current && cursorLabel.current && gsapRef.current) {
      gsapRef.current.to(modalContainer.current, {
        left: pageX,
        top: pageY,
        duration: 0.5,
        ease: "power3",
      });
      gsapRef.current.to(cursor.current, {
        left: pageX,
        top: pageY,
        duration: 0.25,
        ease: "power3",
      });
      gsapRef.current.to(cursorLabel.current, {
        left: pageX,
        top: pageY,
        duration: 0.25,
        ease: "power3",
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  const { t, lang } = useTranslation("common");

  const handleCardHover = useCallback((index: number) => {
    setHoveredCard(index);
  }, []);

  const handleCardLeave = useCallback(() => {
    setHoveredCard(null);
  }, []);

  const handleModalEnter = useCallback((index: number) => {
    setModal({ active: true, index });
  }, []);

  const handleModalLeave = useCallback(() => {
    setModal({ active: false, index });
  }, [index]);

  console.log(services);

  const renderCard = useCallback(
    (item: any, i: number, isDesign: boolean = false) => (
      <motion.div
        className={s.card}
        key={i}
        initial={{ opacity: 1 }}
        animate={{
          opacity:
            hoveredCard === null
              ? 1
              : hoveredCard === (isDesign ? i + design.length : i)
              ? 1
              : 0.5,
          scale: hoveredCard === (isDesign ? i + design.length : i) ? 1.02 : 1,
        }}
        transition={{ duration: 0.3 }}
        onHoverStart={() => handleCardHover(isDesign ? i + design.length : i)}
        onHoverEnd={handleCardLeave}
        onMouseEnter={() => handleModalEnter(index)}
        onMouseLeave={handleModalLeave}
      >
        <Link href={`/service/${item.slug}`}>
          <div className={s.wrap}>
            <div className={s.marker}>{item.marker}</div>
            <p className={s.cardTitle}>
              {lang === "en" ? item.nameEn : item.name}
            </p>
          </div>
          <p className={s.cardSubtitle}>
            {lang === "en" ? item.subtitlePenEn : item.subtitlePen}
          </p>
          <div className={s.wrapper}>
            <p className={s.text}>
              {lang === "en" ? item.subtitleEn : item.subtitle}
            </p>
            <div className={s.line} />
          </div>
          <p className={s.prices}>
            <span className={s.spanPrice}>from</span>
            <CountUpDynamic
              from={0}
              to={lang === "en" ? item.priceEn : item.price}
              separator=","
              direction="up"
              duration={1}
              className={s.price}
            />
            <span className={s.price}>$</span>
          </p>
        </Link>
      </motion.div>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      hoveredCard,
      index,
      handleCardHover,
      handleCardLeave,
      handleModalEnter,
      handleModalLeave,
    ]
  );

  return (
    <motion.section
      className={s.services}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
    >
      {isMobile ? (
        <div className={s.titles}>
          <p className={s.title}>{t("services.title")}</p>
          <div className={s.container}>
            <SplitTextScreen
              text="Take a look at all our services, you may find something new for you, click the button to do so"
              className={s.subtitle}
            />
            <p className={s.title2}>{t("services.title2")}</p>
          </div>
        </div>
      ) : (
        <div className={s.titles}>
          <Symbol text={t("services.title")} className={s.title} />
          <div className={s.container}>
            <SplitTextScreen
              text="Take a look at all our services, you may find something new for you, click the button to do so"
              className={s.subtitle}
            />
            <Symbol text={t("services.title2")} className={s.title2} />
          </div>
        </div>
      )}
      <div className={s.items}>
        <p className={s.titleItem}>{t("services.subtitle")}</p>
        <div className={s.cards}>
          {services
            .sort((a: any, b: any) => b.sort - a.sort)
            .filter((item: any) => item.develop)
            .map((item, i) => renderCard(item, i))}
        </div>
        <p className={s.titleItem}>{t("services.subtitle2")}</p>
        <div className={s.cards}>
          {services
            .sort((a: any, b: any) => b.sort - a.sort)
            .filter((item: any) => item.design)
            .map((item, i) => renderCard(item, i, true))}
        </div>
      </div>
      <Modal modal={modal} projects={design} />
      <Link href="/contacts">
        <Button buttonClass={s.view} circleClass={s.circle}>
          {t("services.order")}
        </Button>
      </Link>
    </motion.section>
  );
};

export default Services;