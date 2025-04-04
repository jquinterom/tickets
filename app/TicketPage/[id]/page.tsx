import { PageProps } from "@/.next/types/app/page";
import TicketForm from "@/app/(components)/TicketForm";
import ENV from "@/app/(config)/env";
import { TicketType } from "@/app/(types)/Ticket";

const getTicketById = async (id: string) => {
  try {
    const response = await fetch(`${ENV.API_BASE_URL}/Tickets/${id}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Error fetching ticket");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("error", error);
  }
};

const TicketPage = async ({ params }: PageProps) => {
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
