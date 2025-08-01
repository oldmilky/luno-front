"use client";
import { FC, useState } from "react";
import Modal from "./Modal/Modal";
import Project from "./Project/Project";
import { projects } from "./Projects";
import s from "./Portfolio.module.scss";
import { motion, AnimatePresence } from "framer-motion";
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

type FilterType = "all" | "sites" | "designs";

const Portfolio: FC<{ projects: IProject[] }> = ({ projects }) => {
  const [modal, setModal] = useState({ active: false, index: 0 });
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const isMobile = useMediaQuery({ query: "(max-width: 1425px)" });
  const { t, lang } = useTranslation("common");

  // Функция фильтрации проектов
  const getFilteredProjects = (): IProject[] => {
    switch (activeFilter) {
      case "sites":
        return projects.filter((project) => project.develop);
      case "designs":
        return projects.filter((project) => project.design);
      case "all":
      default:
        return projects;
    }
  };

  const filteredProjects = getFilteredProjects();

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
      <Filter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      <div className={s.projects}>
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => {
            return (
              <motion.div
                key={`${project._id}-${project.slug}`}
                custom={1.2 + index * 0.2}
                variants={bottomToTop}
                initial="hidden"
                animate="visible"
                exit={{
                  opacity: 0,
                  scale: 0.8,
                  transition: {
                    duration: 0.3,
                    ease: "easeInOut",
                  },
                }}
                layout
                transition={{
                  layout: {
                    duration: 0.4,
                    ease: "easeInOut",
                  },
                }}
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
        </AnimatePresence>
        <div className={s.planetWrap}>
          <Image
            draggable={false}
            src={planet}
            alt="planet"
            className={s.planet}
          />
        </div>
      </div>
      <Modal modal={modal} projects={filteredProjects} />
    </motion.section>
  );
};

export default Portfolio;
