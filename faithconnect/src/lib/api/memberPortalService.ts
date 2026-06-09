import api from "./axios";

export const memberPortalService = {
  dashboard: () =>
    api.get(
      "/memberportal/dashboard"
    ),

  profile: () =>
    api.get(
      "/memberportal/profile"
    ),

  updateProfile: (
    data: any
  ) =>
    api.put(
      "/memberportal/profile",
      data
    ),

  attendance: () =>
    api.get(
      "/memberportal/attendance"
    ),

  upcomingServices: () =>
    api.get(
      "/services/upcoming"
    ),
};