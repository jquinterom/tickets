import TicketForm from "@/app/(components)/TicketForm";
import { TicketType } from "@/app/(types)/Ticket";

interface TicketPageProps {
  params: {
    id: string;
  };
}

const getTicketById = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Error fetching ticket");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("error", error);
  }
};

const TicketPage = async ({ params }: TicketPageProps) => {
  const { id } = await params;

  const EDIT_MODE = id !== "new";

  let updateTicketData: TicketType;

  if (EDIT_MODE) {
    const foundTicket = await getTicketById(id);
    updateTicketData = foundTicket.foundTicket;
  } else {
    updateTicketData = {
      _id: "new",
      title: "",
      description: "",
      category: "",
      priority: 0,
      progress: 0,
      status: "no started",
    };
  }

  return <TicketForm ticket={updateTicketData} />;
};

export default TicketPage;
