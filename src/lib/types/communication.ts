export interface CommunicationHistory {
  id: string;
  recipient: string;
  subject?: string;
  message: string;
  channel: string;
  status: string;
  sentAt: string;
}

export interface Template {
  id: string;
  name: string;
  type: string;
  subject?: string;
  content: string;
}

export interface BulkSmsDto {
  memberIds: string[];
  message: string;
}

export interface BulkEmailDto {
  memberIds: string[];
  subject: string;
  message: string;
}