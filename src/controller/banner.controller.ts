import { Response } from "express";
import { IReqUser } from "../types/auth";
import BannerModel, { bannerDAO } from "../models/Banner";
import response from "../utils/response";
import { IPaginationQuery } from "../types/pagination";
import { QueryFilter } from "mongoose";

export const createBanner = async (req: IReqUser, res: Response) => {
  await bannerDAO.validate(req.body);

  const banner = new BannerModel(req.body);

  await banner.save();

  response.success(res, banner, "Create Banner success");
};

export const updateBanner = async (req: IReqUser, res: Response) => {
  const { id } = req.params;

  const banner = await BannerModel.findByIdAndUpdate(id, req.body, {
    returnDocument: "after",
    runValidators: true,
  });

  response.success(res, banner, "Update banner success");
};

export const removeBanner = async (req: IReqUser, res: Response) => {
  const { id } = req.params;

  const banner = await BannerModel.findByIdAndDelete(id, {
    returnDocument: "after",
    runValidators: true,
  });

  response.success(res, banner, "Remove banner success");
};

export const findAllBanner = async (req: IReqUser, res: Response) => {
  const {
    page = 1,
    limit = 10,
    search,
  } = req.query as unknown as IPaginationQuery;

  const query: QueryFilter<typeof BannerModel> = {};

  if (search) {
    Object.assign(query, {
      ...query,
      $text: {
        $search: search,
      },
    });
  }

  const banner = await BannerModel.find(query)
    .limit(limit)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 })
    .exec();

  const count = await BannerModel.countDocuments(query);

  response.pagination(
    res,
    banner,
    {
      total: count,
      totalPages: Math.ceil(limit / page),
      current: page,
    },
    "Find all banner success",
  );
};

export const findOneBanner = async (req: IReqUser, res: Response) => {
  const { id } = req.params;

  const banner = await BannerModel.findById(id);

  if (!banner) {
    return response.notFound(res, `Data with id ${id} does not exist`);
  }

  response.success(res, banner, "Find banner success");
};
