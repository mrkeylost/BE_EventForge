import * as Yup from "yup";
import mongoose, { Types } from "mongoose";

export const ticketDAO = Yup.object({
  price: Yup.number().required(),
  name: Yup.string().required(),
  event: Yup.string().required(),
  description: Yup.string().required(),
  quantity: Yup.number().required(),
});

export type TTicket = Yup.InferType<typeof ticketDAO>;

export interface Ticket extends Omit<TTicket, "event"> {
  event: Types.ObjectId;
}

const Schema = mongoose.Schema;

const ticketSchema = new Schema<Ticket>(
  {
    price: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    event: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Event",
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const TicketModel = mongoose.model<Ticket>("Ticket", ticketSchema);

export default TicketModel;
