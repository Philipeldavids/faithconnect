import api from "./axios";

export const settingsService = {
  get: () =>
    api.get("/settings"),

  update: (data: any) =>
    api.put(
      "/settings",
      data
    ),
};