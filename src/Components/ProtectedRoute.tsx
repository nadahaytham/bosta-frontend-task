import { Navigate } from "react-router-dom";
import { useAppSelector } from "../Store/hooks";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = useAppSelector((state) => state.auth.token);

  if (!token) return <Navigate to="/login" />;

  return children;
}
