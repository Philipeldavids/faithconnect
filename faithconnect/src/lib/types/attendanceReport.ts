export interface AttendanceDashboard {
  totalMembers: number;
  presentToday: number;
  lateToday: number;
  absentToday: number;
  attendanceRate: number;
}

export interface AttendanceTrend {
  period: string;
  attendanceCount: number;
}

export interface DepartmentAttendance {
  departmentName: string;
  attendanceCount: number;
}

export interface TopAttendee {
  memberId: string;
  membershipNumber: string;
  memberName: string;
  attendanceCount: number;
}