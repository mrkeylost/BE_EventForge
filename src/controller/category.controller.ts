import { Response } from "express";
import { IReqUser } from "../types/auth";
import CategoryModel, { Category, categoryDAO } from "../models/Category";
import response from "../utils/response";
import { IPaginationQuery } from "../types/pagination";

export const createCategory = async (req: IReqUser, res: Response) => {
  const { name, description, icon } = req.body as unknown as Category;

  await categoryDAO.validate({
    name,
    description,
    icon,
  });

  const category = new CategoryModel({ name, description, icon });

  await category.save();

  response.success(res, category, "Create category success");
};

export const findAllCategory = async (req: IReqUser, res: Response) => {
  const {
    page = 1,
    limit = 10,
    search,
  } = req.query as unknown as IPaginationQuery;

  const query = {};

  if (search) {
    Object.assign(query, {
      $or: [
        {
          name: { $regex: search, $options: "i" },
        },
        {
          description: { $regex: search, $options: "i" },
        },
      ],
    });
  }

  const category = await CategoryModel.find(query)
    .limit(limit)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 })
    .exec();

  const count = await CategoryModel.countDocuments(query);

  response.pagination(
    res,
    category,
    {
      total: count,
      totalPages: Math.ceil(count / limit),
      current: page,
    },
    "Find all category Success",
  );
};

export const findOneCategory = async (req: IReqUser, res: Response) => {
  const { id } = req.params;

  const category = await CategoryModel.findById(id);

  response.success(res, category, "Find one category success");
};

export const updateCategory = async (req: IReqUser, res: Response) => {
  const { id } = req.params;

  const category = await CategoryModel.findByIdAndUpdate(id, req.body, {
    returnDocument: "after",
    runValidators: true,
  });

  response.success(res, category, "Update category success");
};

export const removeCategory = async (req: IReqUser, res: Response) => {
  const { id } = req.params;

  const category = await CategoryModel.findByIdAndDelete(id);

  response.success(res, category, "Delete category success");
};
