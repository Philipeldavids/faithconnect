import type {
  Permission,
} from "./permission";

export interface Role {
  id: string;
  name: string;
  description: string;
}

export interface RoleDetails
  extends Role {
  permissions: Permission[];
}

export interface CreateRoleDto {
  name: string;
  description: string;
}