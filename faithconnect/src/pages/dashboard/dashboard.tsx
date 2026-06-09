import { useQuery } from "@tanstack/react-query";

import PageHeader from "../../components/layouts/PageHeader";
import StatCard from "../../components/cards/StatCards";
import AttendanceChart from "../../components/charts/AttendanceChart";
import LoadingSpinner from "../../components/common/LoadingSpinner";

import { dashboardService } from "../../lib/api/dashboardService";

export default function Dashboard() {
  const { data, isLoading } =
    useQuery({
      queryKey: ["dashboard-summary"],
      queryFn: () =>
        dashboardService.summary(),
    });

  const summary = data?.data;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
    
      <PageHeader
        title="Dashboard"
        subtitle="Church Overview"
      />

      {/* Membership + Attendance */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
        <StatCard
          title="Total Members"
          value={
            summary?.totalMembers ?? 0
          }
        />

        <StatCard
          title="Present Today"
          value={
            summary?.presentToday ?? 0
          }
        />

        <StatCard
          title="Late Today"
          value={
            summary?.lateToday ?? 0
          }
        />

        <StatCard
          title="Absent Today"
          value={
            summary?.absentToday ?? 0
          }
        />
      </div>

      {/* Communication */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <StatCard
          title="Attendance Rate"
          value={`${summary?.attendanceRate ?? 0}%`}
        />

        <StatCard
          title="SMS Sent"
          value={
            summary?.smsSent ?? 0
          }
        />

        <StatCard
          title="Emails Sent"
          value={
            summary?.emailsSent ?? 0
          }
        />

        <StatCard
          title="Departments"
          value={
            summary?.departmentCount ??
            0
          }
        />
      </div>

      {/* Chart */}

      <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
        <h3 className="text-lg font-semibold mb-4">
          Attendance Trend
        </h3>

        <AttendanceChart
          data={
            summary?.attendanceTrend ??
            []
          }
        />
      </div>
    </>
  );
}