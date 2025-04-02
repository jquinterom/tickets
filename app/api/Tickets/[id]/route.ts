import Ticket from "@/app/(models)/Ticket";
import { NextResponse } from "next/server";

interface TicketRouteProps {
  params: {
    id: string;
  };
}

export async function DELETE(request: Request, { params }: TicketRouteProps) {
  console.log("request", request);

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

export async function GET(request: Request, { params }: TicketRouteProps) {
  try {
    const { id } = await params;

    const foundTicket = await Ticket.findById(id);
    return NextResponse.json({ foundTicket }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: TicketRouteProps) {
  try {
    const { id } = await params;
    const body = await request.json();
    const ticketData = body.formData;

    if (!id) {
      return NextResponse.json(
        { message: "error", error: "Id is required" },
        { status: 400 }
      );
    }

    await Ticket.findByIdAndUpdate(id, {
      ...ticketData,
    });

    return NextResponse.json(
      { message: "Ticket updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 500 });
  }
}
