export interface Attendance {
  id: string;
  memberId: string;
  memberName: string;
  checkInTime: string;
  status: string;
}
export interface AttendanceReportDto {
  id: string;
  memberId: string;
  memberName: string;
  membershipNumber: string;
  checkInTime: string;
  status: string;
  serviceName: string;
}
export interface AttendanceDto {
  id: string;

  memberId: string;

  membershipNumber: string;

  memberName: string;

  serviceId: string;

  serviceName: string;

  status: string;

  checkInTime: string;
}
export interface AttendanceSummary {
  totalPresent: number;
  totalLate: number;
  totalAbsent: number;
}
export interface ManualAttendanceDto {
  serviceId: string;

  memberId: string;

  status: number;
}
export interface SelfCheckInDto {
  serviceId: string;

  latitude: number;

  longitude: number;
}

export interface AttendanceDashboardDto {
  totalMembers: number;

  presentToday: number;

  lateToday: number;

  absentToday: number;

  attendanceRate: number;
}

export interface AttendanceTrendDto {
  period: string;

  attendanceCount: number;
}

export interface DepartmentAttendanceDto {
  departmentName: string;

  attendanceCount: number;
}

export interface TopAttendeeDto {
  memberId: string;

  membershipNumber: string;

  memberName: string;

  attendanceCount: number;
}