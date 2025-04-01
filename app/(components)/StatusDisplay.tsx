import { TicketStatus, TicketStatusType } from "../(types)/TicketStatus";

interface StatusDisplayProps {
  status: TicketStatusType;
}

const getColor = (status: TicketStatusType) => {
  switch (status) {
    case TicketStatus["no started"]:
      return "bg-red-200";
    case TicketStatus.started:
      return "bg-yellow-200";
    case TicketStatus.done:
      return "bg-green-200";
    default:
      return "bg-slate-200";
  }
};

const StatusDisplay = ({ status }: StatusDisplayProps) => {
  return (
    <span
      className={`inline-block rounded-full px-2 py-1 text-xs font-semibold text-gray-700 ${getColor(
        status
      )}`}
    >
      {status}
    </span>
  );
};

export default StatusDisplay;
