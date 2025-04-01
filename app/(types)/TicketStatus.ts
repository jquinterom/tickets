export const TicketStatus = {
  "no started": "no started",
  started: "started",
  done: "done",
};

export type TicketStatusType = keyof typeof TicketStatus;
