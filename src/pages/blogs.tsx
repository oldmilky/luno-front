import Blogs from "@/components/layout/Blog/Blogs";
import Seo from "@/providers/Seo";
import { NextPage } from "next";
import dynamic from "next/dynamic";

const CasesPage: NextPage = () => {
  const Footer = dynamic(() => import("@/components/ui/Footer/Footer"), {
    ssr: false,
  });

  return (
    <Seo title="LUNO - Разработка уникальных сайтов и дизайнов!">
      <Blogs />
      <Footer />
    </Seo>
  );
};

export default CasesPage;
