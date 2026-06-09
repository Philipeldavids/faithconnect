import api from "./axios";

import type {
  CreateServiceDto,
} from "../types/service";

export const serviceService = {
  list: () =>
    api.get("/services"),

  get: (id: string) =>
    api.get(`/services/${id}`),

  create: (data: CreateServiceDto) =>
    api.post("/services", data),

  update: (
    id: string,
    data: CreateServiceDto
  ) =>
    api.put(
      `/services/${id}`,
      data
    ),

  delete: (id: string) =>
    api.delete(
      `/services/${id}`
    ),

  upcoming: () =>
    api.get(
      "/services/upcoming"
    ),
};