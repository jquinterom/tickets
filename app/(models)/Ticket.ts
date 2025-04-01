import mongoose, { Schema } from "mongoose";
import { TicketType } from "../(types)/Ticket";

mongoose.connect(process.env.MONGODB_URI || "");

mongoose.Promise = global.Promise;

const ticketSchema = new Schema<TicketType>(
  {
    title: String,
    description: String,
    category: String,
    priority: Number,
    progress: Number,
    status: String,
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);

export default Ticket;
