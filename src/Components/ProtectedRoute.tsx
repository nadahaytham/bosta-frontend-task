import { Navigate } from "react-router-dom";
import { useAppSelector } from "../Store/hooks";

//Redirects unauthenticated users to Login page.
export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = useAppSelector((state) => state.auth.token);
  
  // If user is not authenticated, redirect to login
  if (!token) return <Navigate to="/login" />;

  return children;
}
