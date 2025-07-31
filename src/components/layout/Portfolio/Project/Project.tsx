"use client";
import React from "react";
import s from "./Project.module.scss";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { IProject } from "@/interfaces/project.interface";
import { FC } from "react";

const Project: FC<{
  index: number;
  name: string;
  nameEn: string;
  develop: boolean;
  design: boolean;
  typeService: string;
  slug: string;
  setModal: (modal: { active: boolean; index: number }) => void;
}> = ({
  index,
  name,
  nameEn,
  develop,
  design,
  typeService,
  setModal,
  slug,
}) => {
  const { t, lang } = useTranslation("common");

  return (
    <Link href={`/case/${slug}`}>
      <div className={s.project}>
        <div
          className={s.content}
          onMouseEnter={() => {
            setModal({ active: true, index });
          }}
          onMouseLeave={() => {
            setModal({ active: false, index });
          }}
        >
          <div className={s.container}>
            <h2 className={s.title}>{lang === "ru" ? name : nameEn}</h2>
            <div className={s.tags}>
              {develop && <p className={s.tag}>#{t("portfolio.sites")}</p>}
              {design && <p className={s.tag}>#{t("portfolio.designs")}</p>}
            </div>
          </div>
          <p className={s.type}>{typeService}</p>
        </div>
      </div>
    </Link>
  );
};

export default Project;
