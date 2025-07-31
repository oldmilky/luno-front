import Register from "@/components/layout/Auth/Register/Register";
import Seo from "@/providers/Seo";
import { NextPage } from "next";

const RegisterPage: NextPage = () => {
  return (
    <Seo title="Luno | Register">
      <Register isPasswordRequired />
    </Seo>
  );
};

export default RegisterPage;
