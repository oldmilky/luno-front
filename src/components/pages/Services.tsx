import Faq from "@/components/layout/Faq/Faq";
import Services from "@/components/layout/Services/Services";
import Header from "@/components/ui/Header/Header";
import Seo from "@/providers/Seo";
import Footer from "../ui/Footer/Footer";
import { IService } from "@/interfaces/service.interface";
import { FC } from "react";
import useTranslation from "next-translate/useTranslation";

const ServicesPages: FC<{ services: IService[] }> = ({ services }) => {
  const { lang } = useTranslation("common");

  const title =
    lang === "ru"
      ? "Разработка сайтов, брендинг, SEO и маркетинг под ключ — Услуги LUNOWEB"
      : "Website development, branding, SEO and marketing — LUNOWEB Services";

  const description =
    lang === "ru"
      ? "Веб-студия LUNOWEB предоставляет комплексные digital-услуги: разработка сайтов любой сложности, фирменный стиль, SEO-продвижение и маркетинг. Индивидуальный подход, результат под бизнес-задачи."
      : "LUNOWEB offers a full range of digital services: website development, branding, SEO and marketing. Custom solutions tailored to your business goals.";

  return (
    <Seo title={title} description={description} lang={lang as "ru" | "en"}>
      <Header />
      <Services services={services} />
      <Faq themeWhite />
      <Footer />
    </Seo>
  );
};

export default ServicesPages;
