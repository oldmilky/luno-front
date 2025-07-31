import EditService from "@/components/layout/Manage/Services/Edit/EditService";
import Footer from "@/components/ui/Footer/Footer";
import Header from "@/components/ui/Header/Header";
import { NextPageAuth } from "@/interfaces/user.interface";
import Seo from "@/providers/Seo";

const EditServicePage: NextPageAuth = () => {
  return (
    <>
      <Header />
      <EditService />
      <Footer />
    </>
  );
};

EditServicePage.isOnlyAdmin = true;

export default EditServicePage;
