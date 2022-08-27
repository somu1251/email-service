export interface EmailPayload {
  to: string;
  from: string;
  bcc: string;
  cc: string;
  subject: string;
  text: string;
  html: string;
}
