import api from "./axios";

import type {
  User,
  UserDetails,
  CreateUserDto,
  AssignUserRolesDto,
  UpdateUserDto,
} from "../types/user";

export const userService = {
  list: () =>
    api.get<User[]>("/users"),

  get: (id: string) =>
    api.get<UserDetails>(
      `/users/${id}`
    ),

  create: (
    data: CreateUserDto
  ) =>
    api.post(
      "/users",
      data
    ),

 update: (
  id: string,
  data: UpdateUserDto
) =>
  api.put(
    `/users/${id}`,
    data
  ),

  delete: (id: string) =>
    api.delete(
      `/users/${id}`
    ),

 assignRoles: (
  data: AssignUserRolesDto
) =>
  api.post(
    "/users/assign-roles",
    data
  ),

getUserRoles: (
  userId: string
) =>
  api.get<string[]>(
    `/users/${userId}/roles`
  ),
};