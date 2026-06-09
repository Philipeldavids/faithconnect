import api from "./axios";

export const templateService = {
  list: () =>
    api.get("/templates"),

  get: (id: string) =>
    api.get(`/templates/${id}`),

  create: (data: any) =>
    api.post("/templates", data),

  update: (
    id: string,
    data: any
  ) =>
    api.put(
      `/templates/${id}`,
      data
    ),

  delete: (id: string) =>
    api.delete(`/templates/${id}`),
};