import ManageProjects from "@/components/layout/Manage/Projects/ManageProjects";
import Footer from "@/components/ui/Footer/Footer";
import Header from "@/components/ui/Header/Header";
import { NextPageAuth } from "@/interfaces/user.interface";
import Seo from "@/providers/Seo";

const ManageProjectsPage: NextPageAuth = () => {
  return (
    <>
      <Header />
      <ManageProjects />
      <Footer />
    </>
  );
};

ManageProjectsPage.isOnlyAdmin = true;

export default ManageProjectsPage;
