import ServicePages from "@/components/pages/Service";
import { ServiceService } from "@/services/service.service";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { IService } from "@/interfaces/service.interface";

const ServicePage: NextPage<{ service: IService; services: IService[] }> = ({
  service,
  services,
}) => {
  return <ServicePages service={service} services={services} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  let services: IService[] = [];
  try {
    const fetchedServices = await ServiceService.getAll();
    services = fetchedServices.data;
  } catch (error) {
    console.log(error);
  }
  const paths = services.map((service) => ({
    params: { slug: service.slug },
  }));
  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug;
  let service;
  let services: IService[] = [];

  if (typeof slug === "string") {
    try {
      const fetchedService = await ServiceService.getBySlug(slug);
      service = fetchedService.data;
      const fetchedServices = await ServiceService.getAll();
      services = fetchedServices.data;
    } catch (error) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        service,
        services,
      },
      revalidate: 60,
    };
  } else {
    return {
      notFound: true,
    };
  }
};

export default ServicePage;
