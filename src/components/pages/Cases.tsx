import Faq from "@/components/layout/Faq/Faq";
import Header from "@/components/ui/Header/Header";
import Seo from "@/providers/Seo";
import Footer from "../ui/Footer/Footer";
import Portfolio from "../layout/Portfolio/Portfolio";
import { IProject } from "@/interfaces/project.interface";
import { FC } from "react";
import useTranslation from "next-translate/useTranslation";

const CasesPages: FC<{ projects: IProject[] }> = ({ projects }) => {
  const { lang } = useTranslation("common");

  const title =
    lang === "ru"
      ? "Портфолио работ — Дизайн, сайты и брендинг от студии LUNOWEB"
      : "Portfolio — Websites, Branding & Design by LUNOWEB";

  const description =
    lang === "ru"
      ? "Ознакомьтесь с портфолио студии LUNOWEB: примеры дизайна, UX/UI, лендингов, корпоративных и e-commerce сайтов. Мы создаём проекты, которые работают на результат."
      : "Explore LUNOWEB's portfolio: UI/UX design, landing pages, corporate and e-commerce websites. We deliver results-driven digital experiences.";

  return (
    <Seo title={title} description={description} lang={lang as "ru" | "en"}>
      <Header />
      <Portfolio projects={projects} />
      <Faq themeWhite />
      <Footer />
    </Seo>
  );
};

export default CasesPages;
