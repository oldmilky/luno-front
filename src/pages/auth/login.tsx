import Login from "@/components/layout/Auth/Login/Login";
import Seo from "@/providers/Seo";
import { NextPage } from "next";

const AuthPage: NextPage = () => {
  return (
    <Seo title="Luno | Auth">
      <Login isPasswordRequired />
    </Seo>
  );
};

export default AuthPage;
