import EditProject from "@/components/layout/Manage/Projects/Edit/EditProject";
import Footer from "@/components/ui/Footer/Footer";
import Header from "@/components/ui/Header/Header";
import { NextPageAuth } from "@/interfaces/user.interface";
import Seo from "@/providers/Seo";

const EditProjectPage: NextPageAuth = () => {
  return (
    <>
      <Header />
      <EditProject />
      <Footer />
    </>
  );
};

EditProjectPage.isOnlyAdmin = true;

export default EditProjectPage;
