import api from "./axios";

export const attendanceService = {
  // Dashboard Summary
  dashboard: () =>
    api.get(
      "/attendance/dashboard"
    ),

  // Today's Attendance
  today: () =>
    api.get(
      "/attendance/today"
    ),

  // Service Attendance Register
  serviceAttendance: (
    serviceId: string
  ) =>
    api.get(
      `/attendance/service/${serviceId}`
    ),

  // Manual Check-In
  manualCheckIn: (
    data: {
      serviceId: string;
      memberId: string;
      status: number;
    }
  ) =>
    api.post(
      "/attendance/manual-checkin",
      data
    ),

  // Self-Service GPS Check-In
  selfCheckIn: (
    data: {
      serviceId: string;
      latitude: number;
      longitude: number;
    }
  ) =>
    api.post(
      "/attendance/self-checkin",
      data
    ),

  // Dashboard Widgets
  monthlyTrend: () =>
    api.get(
      "/attendance/trend/monthly"
    ),

  departmentAttendance: () =>
    api.get(
      "/attendance/departments"
    ),

  topAttendees: () =>
    api.get(
      "/attendance/top-attendees"
    ),

  // Member History
  memberHistory: (
    memberId: string
  ) =>
    api.get(
      `/attendance/member/${memberId}`
    ),

  // Service Summary
  serviceSummary: (
    serviceId: string
  ) =>
    api.get(
      `/attendance/service/${serviceId}/summary`
    ),

  // Export Report
  exportReport: (
    startDate: string,
    endDate: string
  ) =>
    api.get(
      `/attendance/export?startDate=${startDate}&endDate=${endDate}`,
      {
        responseType:
          "blob",
      }
    ),
};