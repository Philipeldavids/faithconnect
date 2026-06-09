import { Navigate } from "react-router-dom";

import { useAuthStore }
from "../lib/store/authStore";
interface Props {
  children: React.ReactNode;
}

export default function MemberRoute({
  children,
}: Props) {
  const token =
      useAuthStore(
        x => x.token
      );
  
    if (!token){
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return children;
}