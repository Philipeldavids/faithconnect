export interface User {
  id: string;
  fullName: string;
  churchId: string;
  userName: string;
  email: string;
  phoneNumber: string;
  isActive: boolean;
  roles: string[];
}

export interface UserDetails
  extends User {
  createdAt: string;
}

export interface CreateUserDto {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  roleIds: string[];
}

export interface UpdateUserDto {
  fullName: string;
  email: string;
  phoneNumber: string;
  isActive: boolean;
}
export interface AssignUserRolesDto {
  userId: string;
  roles: string[];
}