import { toastError } from "@/components/ui/Toast/Toast";
import { IProject } from "@/interfaces/project.interface";
import { ProjectService } from "@/services/project.service";
import { GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";

// Динамическая загрузка страницы Cases для code splitting
const CasesPages = dynamic(() => import("@/components/pages/Cases"), {
  ssr: true, // SSR важен для SEO
});

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
    if (typeof window !== "undefined") {
      toastError("Failed to fetch data:");
    }
  }
  return {
    props: {
      projects,
    },
    revalidate: 60,
  };
};

export default CasesPage;
