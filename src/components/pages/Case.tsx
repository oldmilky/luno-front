import Faq from "@/components/layout/Faq/Faq";
import Header from "@/components/ui/Header/Header";
import Seo from "@/providers/Seo";
import Footer from "../ui/Footer/Footer";
import Case from "../layout/Case/Case";
import { IProject } from "@/interfaces/project.interface";
import { FC } from "react";

const CasePages: FC<{ project: IProject; projects: IProject[] }> = ({
  project,
  projects,
}) => {
  return (
    <Seo title="LUNO - Разработка уникальных сайтов и дизайнов!">
      <Header />
      <Case project={project} projects={projects} />
      <Faq />
      <Footer />
    </Seo>
  );
};

export default CasePages;
