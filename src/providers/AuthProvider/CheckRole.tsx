import { useRouter } from "next/router";
import { FC } from "react";
import { useAuth } from "@/hooks/useAuth";
import { TypeComponentAuthFields } from "@/interfaces/user.interface";

type CheckRoleProps = {
  children: React.ReactNode;
};
type TypeAppProps = CheckRoleProps & TypeComponentAuthFields;

const CheckRole: FC<TypeAppProps> = ({
  children,
  Component: { isOnlyAdmin, isOnlyUser },
}) => {
  const { user } = useAuth();
  const router = useRouter();

  const Children = () => <>{children}</>;

  if (!isOnlyAdmin && !isOnlyUser) return <Children />;

  if (user?.isAdmin) return <Children />;

  if (isOnlyAdmin) {
    router.pathname !== "/404" && router.replace("/404");
    return null;
  }

  const isUser = user && !user.isAdmin;

  if (isUser && isOnlyUser) return <Children />;
  else {
    router.pathname !== "/auth/login" && router.replace("/auth/login");
    return null;
  }
};

export default CheckRole;
