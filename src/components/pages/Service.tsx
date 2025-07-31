import Seo from "@/providers/Seo";
import Service from "../layout/Service/Service";
import Header from "../ui/Header/Header";
import Faq from "../layout/Faq/Faq";
import Footer from "../ui/Footer/Footer";
import { IService } from "@/interfaces/service.interface";
import { FC } from "react";

const ServicePages: FC<{ service: IService; services: IService[] }> = ({
  service,
  services,
}) => {
  return (
    <Seo title="LUNO - Разработка уникальных сайтов и дизайнов!">
      <Header />
      <Service service={service} services={services} />
      <Faq />
      <Footer />
    </Seo>
  );
};

export default ServicePages;
