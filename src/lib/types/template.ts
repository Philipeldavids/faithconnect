export interface CreateTemplateDto {
  name: string;

  chanel: string;

  subject?: string;

  body: string;
}

export interface UpdateTemplateDto {
  name: string;

  channel: string;

  subject?: string;

  body: string;
}

export interface Template {
  id: string;

  name: string;

  channel: string;

  subject?: string;

  body: string;
}