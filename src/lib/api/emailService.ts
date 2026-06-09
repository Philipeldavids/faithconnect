import api from "./axios";

import type {
  BulkEmailDto,
  MessageResponse,
} from "../types/messaging";

export const emailService = {
  send: (data: BulkEmailDto) =>
    api.post<MessageResponse>(
      "/email/send-bulk",
      data
    ),

  history: () =>
    api.get("/email/history"),
};