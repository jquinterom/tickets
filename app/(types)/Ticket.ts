import { TicketStatusType } from "./TicketStatus";

export type TicketType = {
  _id?: string;
  title: string;
  description: string;
  category: string;
  priority: number;
  progress: number;
  status: TicketStatusType;
  createdAt?: string;
};
