import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../Store/hooks";

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const token = useAppSelector((state) => state.auth.token);

  if (!token) return <Navigate to="/login" />;

  return <>{children}</>;
}
