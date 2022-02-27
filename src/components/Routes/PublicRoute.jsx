import { SupabaseContext } from "../Context/SupabaseContext";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const supabase = useContext(SupabaseContext);
  const auth = supabase.auth.currentUser;
  let location = useLocation();

  if (auth) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }
  return children;
};

export default PublicRoute;
