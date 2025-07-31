import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import CasePages from "@/components/pages/Case";
import { IProject } from "@/interfaces/project.interface";
import { ProjectService } from "@/services/project.service";

const CasePage: NextPage<{
  project: IProject;
  projects: IProject[];
}> = ({ project, projects }) => {
  const { t, lang } = useTranslation("common");
  const router = useRouter();
  const slug = router.query.slug;

  return <CasePages project={project} projects={projects} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  let projects: IProject[] = [];
  try {
    const fetchedProjects = await ProjectService.getAll();
    projects = fetchedProjects.data;
  } catch (error) {
    console.log(error);
  }
  const paths = projects.map((project) => ({
    params: { slug: project.slug },
  }));
  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug;
  let project;
  let projects: IProject[] = [];

  if (typeof slug === "string") {
    try {
      const fetchedProject = await ProjectService.getBySlug(slug);
      project = fetchedProject.data;
      const fetchedProjects = await ProjectService.getAll();
      projects = fetchedProjects.data;
    } catch (error) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        project,
        projects,
      },
      revalidate: 60,
    };
  } else {
    return {
      notFound: true,
    };
  }
};

export default CasePage;
