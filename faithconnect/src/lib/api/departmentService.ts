import api from "./axios";

import type {
  CreateDepartmentDto,
  AssignMemberDepartmentDto,
  Department,
  DepartmentDetails
} from "../types/department";

export const departmentService = {
  list: () =>
    api.get<Department[]>("/departments"),

  get: (id: string) =>
    api.get<DepartmentDetails>(
      `/departments/${id}`
    ),

  create: (
    data: CreateDepartmentDto
  ) =>
    api.post(
      "/departments",
      data
    ),

  update: (
    id: string,
    data: CreateDepartmentDto
  ) =>
    api.put(
      `/departments/${id}`,
      data
    ),

  delete: (id: string) =>
    api.delete(
      `/departments/${id}`
    ),

  assignMember: (
    data: AssignMemberDepartmentDto
  ) =>
    api.post(
      "/departments/assign-member",
      data
    ),

  removeMember: (
    departmentId: string,
    memberId: string
  ) =>
    api.delete(
      `/departments/${departmentId}/members/${memberId}`
    ),
};