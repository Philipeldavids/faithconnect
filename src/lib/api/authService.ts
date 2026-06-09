import api from "./axios";

import type {
  LoginRequest,
  LoginResponse,
  RegisterDto
} from "../../lib/types/auth";

export const authService = {
  login: (
    data: LoginRequest
  ) =>
    api.post<LoginResponse>(
      "/auth/login",
      data
    ),
    register: (
  data: RegisterDto
) =>
  api.post(
    "/auth/register",
    data
  ),
  refresh: (
    refreshToken: string
  ) =>
    api.post(
      "/auth/refresh",
      {
        refreshToken,
      }
    ),

  logout: (
    refreshToken: string
  ) =>
    api.post(
      "/auth/logout",
      {
        refreshToken,
      }
    ),
};