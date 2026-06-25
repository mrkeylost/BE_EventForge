import { Response } from "express";
import { IReqUser } from "../types/auth";
import EventModel, { TEvent } from "../models/Event";
import response from "../utils/response";
import { IPaginationQuery } from "../types/pagination";
import { QueryFilter } from "mongoose";

export const createEvent = async (req: IReqUser, res: Response) => {
  const payload = { ...req.body, createdBy: req.user?.id } as TEvent;

  const event = new EventModel(payload);

  await event.save();

  response.success(res, event, "Create Event Success");
};

export const findAllEvent = async (req: IReqUser, res: Response) => {
  const {
    page = 1,
    limit = 10,
    search,
  } = req.query as unknown as IPaginationQuery;

  const query: QueryFilter<typeof EventModel> = {};

  if (search) {
    Object.assign(query, {
      ...query,
      $text: {
        $search: search,
      },
    });
  }

  const event = await EventModel.find(query)
    .limit(limit)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 })
    .exec();

  const count = await EventModel.countDocuments(query);

  response.pagination(
    res,
    event,
    {
      total: count,
      totalPages: Math.ceil(count / limit),
      current: page,
    },
    "Find all event Success",
  );
};

export const findOneEvent = async (req: IReqUser, res: Response) => {
  const { id } = req.params;

  const event = await EventModel.findById(id);

  if (!event) {
    return response.notFound(res, `Data with id ${id} does not exist`);
  }

  response.success(res, event, "Find one event success");
};

export const updateEvent = async (req: IReqUser, res: Response) => {
  const { id } = req.params;

  const event = await EventModel.findByIdAndUpdate(id, req.body, {
    returnDocument: "after",
    runValidators: true,
  });

  response.success(res, event, "Update event success");
};

export const removeEvent = async (req: IReqUser, res: Response) => {
  const { id } = req.params;

  const event = await EventModel.findByIdAndDelete(id, {
    returnDocument: "after",
  });

  response.success(res, event, "Delete event success");
};

export const findOneBySlug = async (req: IReqUser, res: Response) => {
  const { slug } = req.params;

  const event = await EventModel.findOne({ slug });

  response.success(res, event, "Find one event by slug success");
};
