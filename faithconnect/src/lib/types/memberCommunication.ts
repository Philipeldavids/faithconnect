export interface MemberCommunication {
  id: string;

  channel: string;

  subject?: string;

  message: string;

  status: string;

  sentAt: string;
}