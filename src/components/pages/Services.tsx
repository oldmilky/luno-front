import Faq from "@/components/layout/Faq/Faq";
import Services from "@/components/layout/Services/Services";
import Header from "@/components/ui/Header/Header";
import Seo from "@/providers/Seo";
import Footer from "../ui/Footer/Footer";
import { IService } from "@/interfaces/service.interface";
import { FC } from "react";

const ServicesPages: FC<{ services: IService[] }> = ({ services }) => {
  return (
    <Seo title="LUNO - Разработка уникальных сайтов и дизайнов!">
      <Header />
      <Services services={services} />
      <Faq themeWhite />
      <Footer />
    </Seo>
  );
};

export default ServicesPages;