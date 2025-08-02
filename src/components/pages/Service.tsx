import Seo from "@/providers/Seo";
import Service from "../layout/Service/Service";
import Header from "../ui/Header/Header";
import Faq from "../layout/Faq/Faq";
import Footer from "../ui/Footer/Footer";
import { IService } from "@/interfaces/service.interface";
import { FC } from "react";
import useTranslation from "next-translate/useTranslation";

const ServicePages: FC<{ service: IService; services: IService[] }> = ({
  service,
  services,
}) => {
  const { lang } = useTranslation("common");

  const title =
    lang === "ru"
      ? service.seoTitle || `${service.name} — Наша услуга LUNO`
      : service.seoTitleEn || `${service.nameEn} — Our service LUNO`;

  const description =
    lang === "ru"
      ? service.seoDesc || "Подробнее о нашей услуге LUNO."
      : service.seoDescEn || "Detailed case of our service LUNO.";

  return (
    <Seo
      title={title}
      description={description}
      lang={lang as "ru" | "en"}
      breadcrumbs={[
        { name: lang === "ru" ? "Услуги" : "Services", path: "/services" },
        { name: service.name, path: `/services/${service.slug}` },
      ]}
    >
      <Header />
      <Service service={service} services={services} />
      <Faq />
      <Footer />
    </Seo>
  );
};

export default ServicePages;
