import { useQuery }
from "@tanstack/react-query";

import PageHeader
from "../../components/layouts/PageHeader";

import DataTable
from "../../components/tables/DataTable";

import { attendanceService }
from "../../lib/api/attendanceService";

export default function AttendanceReports() {
  const {
    data: dashboard,
  } = useQuery({
    queryKey: [
      "attendance-dashboard",
    ],
    queryFn: () =>
      attendanceService.dashboard(),
  });

  const {
    data: trends,
  } = useQuery({
    queryKey: [
      "attendance-trends",
    ],
    queryFn: () =>
      attendanceService.monthlyTrend(),
  });

  const {
    data: departments,
  } = useQuery({
    queryKey: [
      "department-attendance",
    ],
    queryFn: () =>
      attendanceService.departmentAttendance(),
  });

  const {
    data: attendees,
  } = useQuery({
    queryKey: [
      "top-attendees",
    ],
    queryFn: () =>
      attendanceService.topAttendees(),
  });

  return (
    <>
      <PageHeader
        title="Attendance Reports"
        subtitle="Attendance analytics"
      />

      {/* KPI Cards */}

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="card p-6">
          <h3>Total Members</h3>

          <p className="text-3xl font-bold">
            {
              dashboard?.data
                ?.totalMembers ?? 0
            }
          </p>
        </div>

        <div className="card p-6">
          <h3>Present Today</h3>

          <p className="text-3xl font-bold">
            {
              dashboard?.data
                ?.presentToday ?? 0
            }
          </p>
        </div>

        <div className="card p-6">
          <h3>Late Today</h3>

          <p className="text-3xl font-bold">
            {
              dashboard?.data
                ?.lateToday ?? 0
            }
          </p>
        </div>

        <div className="card p-6">
          <h3>Attendance Rate</h3>

          <p className="text-3xl font-bold">
            {
              dashboard?.data
                ?.attendanceRate ?? 0
            }
            %
          </p>
        </div>
      </div>

      {/* Monthly Trend */}

      <div className="card p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Monthly Attendance Trend
        </h2>

        <DataTable
          data={
            trends?.data ?? []
          }
          columns={[
            {
              header:
                "Month",
              accessor:
                "period",
            },
            {
              header:
                "Attendance",
              accessor:
                "attendanceCount",
            },
          ]}
        />
      </div>

      {/* Department Attendance */}

      <div className="card p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Department Attendance
        </h2>

        <DataTable
          data={
            departments?.data ??
            []
          }
          columns={[
            {
              header:
                "Department",
              accessor:
                "departmentName",
            },
            {
              header:
                "Attendance",
              accessor:
                "attendanceCount",
            },
          ]}
        />
      </div>

      {/* Top Attendees */}

      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-4">
          Top Attendees
        </h2>

        <DataTable
          data={
            attendees?.data ?? []
          }
          columns={[
            {
              header:
                "Membership No",
              accessor:
                "membershipNumber",
            },
            {
              header:
                "Member",
              accessor:
                "memberName",
            },
            {
              header:
                "Attendance Count",
              accessor:
                "attendanceCount",
            },
          ]}
        />
      </div>
    </>
  );
}