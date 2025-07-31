import ManageServices from "@/components/layout/Manage/Services/ManageServices";
import Footer from "@/components/ui/Footer/Footer";
import Header from "@/components/ui/Header/Header";
import { NextPageAuth } from "@/interfaces/user.interface";
import Seo from "@/providers/Seo";

const ManageServicesPage: NextPageAuth = () => {
  return (
    <>
      <Header />
      <ManageServices />
      <Footer />
    </>
  );
};

ManageServicesPage.isOnlyAdmin = true;

export default ManageServicesPage;
