import { useQuery }
from "@tanstack/react-query";

import PageHeader
from "../../components/layouts/PageHeader";

import { attendanceService }
from "../../lib/api/attendanceService";

export default function AttendanceDashboard() {
  const { data } =
    useQuery({
      queryKey: [
        "attendance-dashboard",
      ],
      queryFn: () =>
        attendanceService.dashboard(),
    });

  const summary =
    data?.data;

  return (
    <>
      <PageHeader
        title="Attendance Dashboard"
        subtitle="Attendance overview"
      />

      <div className="grid grid-cols-4 gap-4">
        <div className="card p-6">
          <h3>Total Members</h3>

          <p className="text-3xl font-bold">
            {
              summary?.totalMembers ??
              0
            }
          </p>
        </div>

        <div className="card p-6">
          <h3>Present Today</h3>

          <p className="text-3xl font-bold">
            {
              summary?.presentToday ??
              0
            }
          </p>
        </div>

        <div className="card p-6">
          <h3>Late Today</h3>

          <p className="text-3xl font-bold">
            {
              summary?.lateToday ??
              0
            }
          </p>
        </div>

        <div className="card p-6">
          <h3>Attendance Rate</h3>

          <p className="text-3xl font-bold">
            {
              summary?.attendanceRate ??
              0
            }
            %
          </p>
        </div>
      </div>
    </>
  );
}