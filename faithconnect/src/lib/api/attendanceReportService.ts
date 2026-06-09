import api from "./axios";

export const attendanceReportService = {
  dashboard: () =>
    api.get(
      "/attendance-reports/dashboard"
    ),

  trend: () =>
    api.get(
      "/attendance-reports/monthly-trend"
    ),

  departments: () =>
    api.get(
      "/attendance-reports/department-attendance"
    ),

  topAttendees: () =>
    api.get(
      "/attendance-reports/top-attendees"
    ),
};