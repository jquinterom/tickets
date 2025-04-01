import { TicketType } from "../(types)/Ticket";
import { formatTimeStamp } from "../(utils)/formatTimeStamp";
import DeleteBlock from "./DeleteBlock";
import PriorityDisplay from "./PriorityDisplay";
import ProgressDisplay from "./ProgressDisplay";
import StatusDisplay from "./StatusDisplay";

interface TicketCardProps {
  ticket: TicketType;
}

const TicketCard = ({ ticket }: TicketCardProps) => {
  return (
    <div className="flex flex-col bg-card hover:bg-card-cover rounded-md shadow-lg p-3 m-2">
      <div className="flex mb-3">
        <PriorityDisplay priority={ticket.priority} />
        <div className="ml-auto">
          {ticket._id && <DeleteBlock id={ticket._id} />}
        </div>
      </div>

      <h4>{ticket.title}</h4>
      <hr className="h-px border-0 bg-page mb-2" />
      <p className="whitespace-wrap">{ticket.description}</p>

      <div className="flex-grow"></div>

      <div className="flex mt-2">
        <div className="flex flex-col">
          <p className="text-xs my-1">{formatTimeStamp(ticket.createdAt)}</p>
          <ProgressDisplay progress={ticket.progress} />
        </div>

        <div className="ml-auto flex items-end">
          <StatusDisplay status={ticket.status} />
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
