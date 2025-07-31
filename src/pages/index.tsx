import Home from "@/components/pages/Home";
import { toastError } from "@/components/ui/Toast/Toast";
import { IProject } from "@/interfaces/project.interface";
import { IService } from "@/interfaces/service.interface";
import { ProjectService } from "@/services/project.service";
import { ServiceService } from "@/services/service.service";
import { GetStaticProps, NextPage } from "next";

const HomePage: NextPage<{ projects: IProject[]; services: IService[] }> = ({
  projects,
  services,
}) => {
  return <Home projects={projects} services={services} />;
};

export const getStaticProps: GetStaticProps = async () => {
  let projects: IProject[] = [];
  let services: IService[] = [];
  try {
    const fetchedProjects = await ProjectService.getAll();
    projects = fetchedProjects.data;
    const fetchedServices = await ServiceService.getAll();
    services = fetchedServices.data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    toastError("Failed to fetch data:");
  }
  return {
    props: {
      projects,
      services,
    },
    revalidate: 60,
  };
};

export default HomePage;
