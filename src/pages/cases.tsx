import Portfolio from "@/components/layout/Portfolio/Portfolio";
import CasesPages from "@/components/pages/Cases";
import { toastError } from "@/components/ui/Toast/Toast";
import { IProject } from "@/interfaces/project.interface";
import Seo from "@/providers/Seo";
import { ProjectService } from "@/services/project.service";
import { GetStaticProps, NextPage } from "next";

const CasesPage: NextPage<{ projects: IProject[] }> = ({ projects }) => {
  return <CasesPages projects={projects} />;
};

export const getStaticProps: GetStaticProps = async () => {
  let projects: IProject[] = [];
  try {
    const fetchedProjects = await ProjectService.getAll();
    projects = fetchedProjects.data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    toastError("Failed to fetch data:");
  }
  return {
    props: {
      projects,
    },
    revalidate: 60,
  };
};

export default CasesPage;
