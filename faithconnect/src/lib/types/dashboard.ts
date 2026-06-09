import { type AttendanceTrend, type TopAttendee } from "./attendanceReport";


export interface DashboardSummary {
  totalMembers: number;
  attendanceToday: number;
  smsSent: number;
  emailsSent: number;
  presentToday: number;
  lateToday: number;
  absentToday: number;
  departmentCount: number;
  newMembersThisMonth: number;
  birthdaysThisMonth: number;
  attendanceRate: number;
  attendanceTrend: AttendanceTrend[];
  topAttendees: TopAttendee[];
}