import { isValidObjectId, QueryFilter, ObjectId, Types } from "mongoose";
import { Response } from "express";
import TicketModel, { ticketDAO } from "../models/Ticket";
import { IReqUser } from "../types/auth";
import response from "../utils/response";
import { IPaginationQuery } from "../types/pagination";

export const createTicket = async (req: IReqUser, res: Response) => {
  await ticketDAO.validate(req.body);

  const ticket = new TicketModel(req.body);
  await ticket.save();

  response.success(res, ticket, "Create ticket success");
};

export const updateTicket = async (req: IReqUser, res: Response) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return response.notFound(res, "Invalid ID Format");
  }

  const ticket = await TicketModel.findByIdAndUpdate(id, req.body, {
    returnDocument: "after",
    runValidators: true,
  });

  response.success(res, ticket, "Update ticket success");
};

export const removeTicket = async (req: IReqUser, res: Response) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return response.notFound(res, "Invalid ID Format");
  }

  const ticket = await TicketModel.findByIdAndDelete(id, {
    returnDocument: "after",
  });

  response.success(res, ticket, "Remove ticket success");
};

export const findAllTicket = async (req: IReqUser, res: Response) => {
  const {
    page = 1,
    limit = 10,
    search,
  } = req.query as unknown as IPaginationQuery;

  const query: QueryFilter<typeof TicketModel> = {};

  if (search) {
    Object.assign(query, {
      ...query,
      $text: { $search: search },
    });
  }

  const ticket = await TicketModel.find(query)
    .populate("event")
    .limit(limit)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 })
    .exec();

  const count = await TicketModel.countDocuments(query);

  response.pagination(
    res,
    ticket,
    {
      total: count,
      totalPages: Math.ceil(limit / page),
      current: page,
    },
    "Find all ticket success",
  );
};

export const findOneTicket = async (req: IReqUser, res: Response) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return response.notFound(res, "Invalid ID Format");
  }

  const ticket = await TicketModel.findById(id);
  if (!ticket) {
    return response.notFound(res, `Data with id ${id} does not exist`);
  }

  response.success(res, ticket, "Update ticket success");
};

export const findAllTicketByEvent = async (req: IReqUser, res: Response) => {
  const { eventId } = req.params;

  if (!isValidObjectId(eventId)) {
    return response.error(res, null, "Invalid ID Format");
  }

  const ticket = await TicketModel.find({
    event: new Types.ObjectId(eventId),
  }).exec();

  response.success(res, ticket, "Find all ticket by event success");
};
