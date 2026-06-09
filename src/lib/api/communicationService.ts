import api from "./axios";

export const communicationService = {
  sendSms: (data: any) =>
    api.post("/communications/sms", data),

  sendEmail: (data: any) =>
    api.post("/communications/email", data),

  history: () =>
    api.get("/communications/history"),

  memberHistory: (id: string) =>
    api.get(`/communications/member/${id}`),
};