import ServicesPages from "@/components/pages/Services";
import { IService } from "@/interfaces/service.interface";
import { ServiceService } from "@/services/service.service";
import { GetStaticProps, NextPage } from "next";
import { toastError } from "@/components/ui/Toast/Toast";

const ServicesPage: NextPage<{ services: IService[] }> = ({ services }) => {
  return <ServicesPages services={services} />;
};

export const getStaticProps: GetStaticProps = async () => {
  let services: IService[] = [];
  try {
    const fetchedProjects = await ServiceService.getAll();
    services = fetchedProjects.data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    toastError("Failed to fetch data:");
  }
  return {
    props: {
      services,
    },
    revalidate: 60,
  };
};

export default ServicesPage;
