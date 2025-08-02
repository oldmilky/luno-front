import Seo from "@/providers/Seo";
import Header from "../ui/Header/Header";
import Faq from "../layout/Faq/Faq";
import Footer from "../ui/Footer/Footer";
import { FC } from "react";
import Blogs from "../layout/Blog/Blogs";
import useTranslation from "next-translate/useTranslation";

const BlogsPages: FC = () => {
  const { lang } = useTranslation("common");

  const title =
    lang === "ru"
      ? "Блог LUNOWEB — Полезные статьи по дизайну, сайтам и digital"
      : "LUNOWEB Blog — Insights on Design, Development & Digital";

  const description =
    lang === "ru"
      ? "Блог веб-студии LUNOWEB: статьи про UX/UI, разработку сайтов, брендинг, маркетинг и SEO. Делаемся знаниями, идеями и кейсами."
      : "Explore the LUNOWEB blog: articles on UX/UI, website development, branding, marketing and SEO. Learn, get inspired, and grow.";

  return (
    <Seo title={title} description={description} lang={lang as "ru" | "en"}>
      <Header />
      <Blogs />
      <Faq />
      <Footer />
    </Seo>
  );
};

export default BlogsPages;
