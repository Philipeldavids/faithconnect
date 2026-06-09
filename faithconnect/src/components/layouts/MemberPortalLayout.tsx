import { Outlet }
from "react-router-dom";
import Header from "../../components/layouts/Header";
import MemberSidebar
from "../layouts/MemberSidebar";

export default function MemberPortalLayout() {
  return (
    <div className="flex min-h-screen">
      <MemberSidebar />
   <div className="flex-1">
        <Header />

      <main className="flex-1 p-6 bg-slate-50">
        <Outlet />
      </main>
    </div>
    </div>
  );
}