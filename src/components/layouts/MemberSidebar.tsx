import { Link }
from "react-router-dom";

export default function MemberSidebar() {
  return (
    <aside className="w-64 bg-white border-r">
      <div className="p-6 border-b">
        <h2 className="font-bold">
          Member Portal
        </h2>
      </div>

      <nav className="p-4 space-y-2">
        <Link
          to="/portal"
          className="block"
        >
          Dashboard
        </Link>

        <Link
          to="/portal/profile"
          className="block"
        >
          My Profile
        </Link>

        <Link
          to="/portal/attendance"
          className="block"
        >
          Attendance
        </Link>

        <Link
          to="/portal/checkin"
          className="block"
        >
          Check In
        </Link>

        {/* <Link
          to="/portal/services"
          className="block"
        >
          Services
        </Link> */}
      </nav>
    </aside>
  );
}