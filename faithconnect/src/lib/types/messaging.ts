export interface BulkSmsDto {
  message: string;
  memberIds?: string[];
}

export interface BulkEmailDto {
  subject: string;
  body: string;
  memberIds?: string[];
}

export interface MessageResponse {
  success: boolean;
  message: string;
}