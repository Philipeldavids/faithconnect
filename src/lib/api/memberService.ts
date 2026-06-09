import api from "./axios";
import {
  type Member,
  type MemberFormData,
  type MemberDetails
} from "../types/member";
import type { MemberAttendance } from "../types/memberAttendance";
import type { MemberCommunication } from "../types/memberCommunication";

export const memberService = {
  list: () =>
    api.get<Member[]>("/members"),
  attendanceHistory: (id: string) =>
  api.get<MemberAttendance[]>(
    `/members/${id}/attendance`
  ),
  communicationHistory: (id: string) =>
  api.get<MemberCommunication[]>(
    `/members/${id}/communications`
  ),
  get: (id: string) =>
    api.get<Member>(`/members/${id}`),
  getDetails: (id: string) =>
  api.get<MemberDetails>(`/members/${id}`),

  create: (data: MemberFormData) =>
    api.post("/members", data),

  update: (
    id: string,
    data: MemberFormData
  ) =>
    api.put(`/members/${id}`, data),

  delete: (id: string) =>
    api.delete(`/members/${id}`),

  
  bulkUpload: (
    formData: FormData
  ) =>
    api.post(
      "/members/bulk-upload",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    ),

  downloadTemplate: () =>
    api.get(
      "/members/template",
      {
        responseType: "blob",
      }
    ),
};