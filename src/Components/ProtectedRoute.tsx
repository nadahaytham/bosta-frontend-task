import { Navigate } from "react-router-dom";
import { useAppSelector } from "../Store/hooks";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const token = useAppSelector((state) => state.auth.token);

  if (!token) return <Navigate to="/login" replace />;

  return <>{children}</>;
}
