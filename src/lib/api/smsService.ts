import api from "./axios";

import type {
  BulkSmsDto,
  MessageResponse,
} from "../types/messaging";

export const smsService = {
  send: (data: BulkSmsDto) =>
    api.post<MessageResponse>(
      "/sms/send-bulk",
      data
    ),

  history: () =>
    api.get("/sms/history"),
};