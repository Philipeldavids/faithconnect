import api from "./axios";

import type {
  Permission,
  
} from "../types/permission";



export const permissionService = {
  list: () =>
    api.get<Permission[]>("/permissions"),

  getRolePermissions: (
    roleId: string
  ) =>
    api.get(
      `/permissions/role/${roleId}`
    ),

  assign: (
    data: {
      roleId: string;
      permissionIds: string[];
    }
  ) =>
    api.post(
      "/permissions/assign",
      data
    ),
};