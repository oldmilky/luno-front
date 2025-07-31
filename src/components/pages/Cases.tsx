import Faq from "@/components/layout/Faq/Faq";
import Header from "@/components/ui/Header/Header";
import Seo from "@/providers/Seo";
import Footer from "../ui/Footer/Footer";
import Portfolio from "../layout/Portfolio/Portfolio";
import { IProject } from "@/interfaces/project.interface";
import { FC } from "react";

const CasesPages: FC<{ projects: IProject[] }> = ({ projects }) => {
  return (
    <Seo title="LUNO - Разработка уникальных сайтов и дизайнов!">
      <Header />
      <Portfolio projects={projects} />
      <Faq themeWhite />
      <Footer />
    </Seo>
  );
};

export default CasesPages;
