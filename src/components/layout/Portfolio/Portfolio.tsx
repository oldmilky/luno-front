"use client";
import { FC, useState } from "react";
import Modal from "./Modal/Modal";
import Project from "./Project/Project";
import { projects } from "./Projects";
import s from "./Portfolio.module.scss";
import { motion } from "framer-motion";
import AnimatedText from "@/components/animate/Symbol/Symbol";
import Symbol from "@/components/animate/Symbol/Symbol";
import SplitTextScreen from "@/components/animate/SplitText/SplitText2";
import planet from "@/assets/images/planetCases.svg";
import Image from "next/image";
import { bottomToTop } from "@/assets/animations/animations";
import { useMediaQuery } from "react-responsive";
import useTranslation from "next-translate/useTranslation";
import Filter from "./Filters/Filter";
import MaskText from "@/components/animate/MaskText/MaskText";
import { IProject } from "@/interfaces/project.interface";

const Portfolio: FC<{ projects: IProject[] }> = ({ projects }) => {
  const [modal, setModal] = useState({ active: false, index: 0 });
  const isMobile = useMediaQuery({ query: "(max-width: 1425px)" });
  const { t, lang } = useTranslation("common");

  return (
    <motion.section
      className={s.portfolio}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {isMobile ? (
        <div className={s.titles}>
          <p className={s.title}>{t("portfolio.title")}</p>
          <p className={s.title2}>{t("portfolio.title2")}</p>
          <SplitTextScreen
            text="Here we have posted our small collection of recent work. Need more? Write to us"
            className={s.subtitle}
          />
        </div>
      ) : (
        <div className={s.titles}>
          <MaskText
            className={s.title}
            words={[t("portfolio.title")]}
            amount={0}
          />
          <MaskText
            className={s.title2}
            words={[t("portfolio.title2")]}
            amount={0}
          />
          <SplitTextScreen
            text="Here we have posted our small collection of recent work. Need more? Write to us"
            className={s.subtitle}
          />
        </div>
      )}
      <Filter />
      <div className={s.projects}>
        {projects.map((project, index) => {
          return (
            <motion.div
              key={index}
              custom={1.2 + index * 0.2}
              variants={index % 2 === 0 ? bottomToTop : bottomToTop}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <Project
                index={index}
                name={project.name}
                nameEn={project.nameEn}
                develop={project.develop}
                design={project.design}
                typeService={project.typeService}
                setModal={setModal}
                slug={project.slug}
              />
            </motion.div>
          );
        })}
        <div className={s.planetWrap}>
          <Image
            draggable={false}
            src={planet}
            alt="planet"
            className={s.planet}
          />
        </div>
      </div>
      <Modal modal={modal} projects={projects} />
    </motion.section>
  );
};

export default Portfolio;
