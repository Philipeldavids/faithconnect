import api from "./axios";
import { type DashboardSummary } from "../types/dashboard";

export const dashboardService = {
  summary: () =>
    api.get<DashboardSummary>(
      "/dashboard/summary"
    ),
};