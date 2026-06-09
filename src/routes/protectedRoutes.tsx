import { Navigate }
from "react-router-dom";

import { useAuthStore }
from "../lib/store/authStore";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const token =
    useAuthStore(
      x => x.token
    );

  if (!token)
    return (
      <Navigate
        to="/login"
        replace
      />
    );

  return <>{children}</>;
}