import TicketCard from "./(components)/TicketCard";
import { TicketType } from "./(types)/Ticket";
import ENV from "@/app/(config)/env";

const getTickets = async () => {
  const response = await fetch(`${ENV.API_BASE_URL}/Tickets`, {
    method: "GET",
    cache: "no-store",
  });
  const data = await response.json();

  return data as { tickets: TicketType[] };
};

const Dashboard = async () => {
  const { tickets } = await getTickets();

  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];

  return (
    <div className="p-5 ">
      <div>
        {tickets &&
          uniqueCategories?.map((uniqueCategory, categoryIndex) => (
            <div key={categoryIndex} className="mb-4">
              <h2>{uniqueCategory}</h2>
              <div className="lg:grid grid-cols-2 xl:grid-cols-4">
                {tickets
                  ?.filter((ticket) => ticket.category === uniqueCategory)
                  .map((filteredTicket, ticketIndex) => (
                    <TicketCard key={ticketIndex} ticket={filteredTicket} />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
