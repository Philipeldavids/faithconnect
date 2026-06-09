export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface RolePermission {
  roleId: string;
  roleName: string;
  permissions: Permission[];
}

export interface AssignPermissionDto {
  roleId: string;
  permissionIds: string[];
}