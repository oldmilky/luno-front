import Faq from "@/components/layout/Faq/Faq";
import Header from "@/components/ui/Header/Header";
import Seo from "@/providers/Seo";
import Footer from "../ui/Footer/Footer";
import Case from "../layout/Case/Case";
import { IProject } from "@/interfaces/project.interface";
import { FC } from "react";
import useTranslation from "next-translate/useTranslation";

const CasePages: FC<{ project: IProject; projects: IProject[] }> = ({
  project,
  projects,
}) => {
  const { lang } = useTranslation("common");

  const title =
    lang === "ru"
      ? project.seoTitle || `${project.name} — Проект в портфолио LUNOWEB`
      : project.seoTitleEn ||
        `${project.nameEn} — Project in LUNOWEB Portfolio`;

  const description =
    lang === "ru"
      ? project.seoDesc ||
        "Детальный кейс о разработке сайта или дизайна от студии LUNOWEB."
      : project.seoDescEn ||
        "Detailed case of web design or development by LUNOWEB.";

  return (
    <Seo
      title={title}
      description={description}
      lang={lang as "ru" | "en"}
      breadcrumbs={[
        { name: lang === "ru" ? "Портфолио" : "Portfolio", path: "/cases" },
        { name: project.name, path: `/cases/${project.slug}` },
      ]}
    >
      <Header />
      <Case project={project} projects={projects} />
      <Faq />
      <Footer />
    </Seo>
  );
};

export default CasePages;
