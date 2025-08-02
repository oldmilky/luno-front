import About from "@/components/layout/Home/About/About";
import Benefits from "@/components/layout/Home/Benefits/Benefits";
import Collection from "@/components/layout/Home/Collection/Collection";
import Preview from "@/components/layout/Home/Preview/Preview";
import Process from "@/components/layout/Home/Process/Process";
import Services from "@/components/layout/Home/Services/Services";
import Tech from "@/components/layout/Home/Tech/Tech";
import Header from "@/components/ui/Header/Header";
import Seo from "@/providers/Seo";
import Footer from "../ui/Footer/Footer";
import { IProject } from "@/interfaces/project.interface";
import { IService } from "@/interfaces/service.interface";
import { FC } from "react";
import useTranslation from "next-translate/useTranslation";

const Home: FC<{ projects: IProject[]; services: IService[] }> = ({
  projects,
  services,
}) => {
  const { lang } = useTranslation("common");

  const title =
    lang === "ru"
      ? "LUNOWEB — Премиум разработка сайтов и дизайнов под ключ"
      : "LUNOWEB — Premium turnkey website development and design";

  const description =
    lang === "ru"
      ? "Создаём премиальные сайты под ключ: от дизайна и UX до запуска и SEO. Индивидуальный подход, гарантии результата."
      : "We create premium websites: from UX and design to SEO. Full-cycle development with guaranteed results.";

  return (
    <Seo title={title} description={description} lang={lang as "ru" | "en"}>
      <Header />
      <Preview />

      <About />
      <Collection projects={projects} />
      <Tech />

      <Services services={services} />

      <Process />

      <Benefits />

      <Footer />
    </Seo>
  );
};

export default Home;
