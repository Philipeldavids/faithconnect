import api from "./axios";
import type {
  Template,
  CreateTemplateDto,
  UpdateTemplateDto,
} from "../types/template";

export const templateService = {
  list: () =>
    api.get<Template[]>(
      "/templates"
    ),

  get: (id: string) =>
    api.get<Template>(
      `/templates/${id}`
    ),

  create: (
    data: CreateTemplateDto
  ) =>
    api.post(
      "/templates",
      data
    ),

  update: (
    id: string,
    data: UpdateTemplateDto
  ) =>
    api.put(
      `/templates/${id}`,
      data
    ),

  delete: (
    id: string
  ) =>
    api.delete(
      `/templates/${id}`
    ),
};