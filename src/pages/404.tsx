import NotFound from "@/components/layout/NotFound/NotFound";
import Seo from "@/providers/Seo";
import { NextPage } from "next";

const NotFoundPage: NextPage = () => {
  return (
    <Seo title="Domination | 404 Not Found">
      <NotFound />
    </Seo>
  );
};

export default NotFoundPage;
