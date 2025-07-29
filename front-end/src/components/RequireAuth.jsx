import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthProvider";

export function RequireAuth({ roles = "all" }) {
  const { user, isAutenticated, loading } = useAuth();
  const location = useLocation();
  let hasAccess = false;

  if (loading)
    return (
      <main>
        <h1>Carregando...</h1>
      </main>
    );

  if (!isAutenticated) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }

  if (roles === "all") {
    hasAccess = true;
  } else {
    hasAccess = roles.includes(user.user_type);
  }

  if (hasAccess) {
    return <Outlet />;
  } else {
    return <Navigate to={"/unautorized"} state={{ from: location }} replace />;
  }
}
