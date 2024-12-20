import { setErrorToast } from "@/hooks/use-toast.tsx";
import { useAllowSecuredRoutes } from "@/store/authenticationState.ts";
import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedLayout: FC<PropsWithChildren> = ({ children }) => {
  const allowSecuredRoutes = useAllowSecuredRoutes();

  if (!allowSecuredRoutes) {
    setErrorToast("Organization is not selected");

    return <Navigate to="/" />;
  }

  return children;
};
