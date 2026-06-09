import api from "./axios";

import type {
  Role,
  RoleDetails,
  CreateRoleDto,
} from "../types/role";

export const roleService = {
  list: () =>
    api.get<Role[]>("/roles"),

  get: (id: string) =>
    api.get<RoleDetails>(
      `/roles/${id}`
    ),

  create: (
    data: CreateRoleDto
  ) =>
    api.post(
      "/roles",
      data
    ),

  update: (
    id: string,
    data: CreateRoleDto
  ) =>
    api.put(
      `/roles/${id}`,
      data
    ),

  delete: (id: string) =>
    api.delete(
      `/roles/${id}`
    ),
};