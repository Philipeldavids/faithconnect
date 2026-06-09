export interface Member {
  id: string;
  membershipNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  membershipDate: string;
  isActive: boolean;
}
export interface MemberDetails {
  id: string;

  membershipNumber: string;

  firstName: string;

  lastName: string;

  email: string;

  phoneNumber: string;

  gender: string;

  membershipDate: string;

  isActive: boolean;

  departments: string[];

  totalAttendance: number;

  lastAttendanceDate?: string;
}
export interface MemberFormData {
  firstName: string;
  lastName: string;
  otherName?: string;
  gender: string;
  dateOfBirth?: string;
  maritalStatus?: string;
  phoneNumber: string;
  email: string;
  occupation?: string;
  address?: string;
}