export interface Department {
  id: string;
  name: string;
  description: string;
  memberCount: number;
}

export interface DepartmentMember {
  memberId: string;
  membershipNumber: string;
  fullName: string;
  email: string;
  phoneNumber: string;
}

export interface DepartmentDetails {
  id: string;
  name: string;
  description: string;
  members: DepartmentMember[];
}

export interface CreateDepartmentDto {
  name: string;
  description: string;
}

export interface AssignMemberDepartmentDto {
  memberId: string;
  departmentId: string;
}