import Ticket from "@/app/(models)/Ticket";
import { NextResponse } from "next/server";

interface TicketRouteProps {
  params: {
    id: string;
  };
}

export async function DELETE(request: Request, { params }: TicketRouteProps) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { message: "error", error: "Id is required" },
      { status: 400 }
    );
  }

  try {
    const deletedTicket = await Ticket.findByIdAndDelete(id);

    if (!deletedTicket) {
      return NextResponse.json(
        { message: "error", error: "Ticket not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Ticket deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 500 });
  }
}
