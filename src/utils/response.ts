import * as Yup from "yup";
import { Response } from "express";
import mongoose from "mongoose";

type Pagination = {
  totalPages: number;
  current: number;
  total: number;
};

const success = (res: Response, data: any, message: string) => {
  return res.status(200).json({
    meta: {
      status: 200,
      message,
    },
    data,
  });
};

const error = (res: Response, error: unknown, message: string) => {
  if (error instanceof Yup.ValidationError) {
    return res.status(400).json({
      meta: {
        status: 400,
        message,
      },
      data: { [`${error.path}`]: error.errors[0] },
    });
  }

  if (error instanceof mongoose.Error) {
    return res.status(500).json({
      meta: {
        status: 500,
        message,
      },
      data: error.name,
    });
  }

  if ((error as any)?.code) {
    const err = error as any;

    return res.status(500).json({
      meta: {
        status: 500,
        message: err.errorResponse.errmsg,
      },
      data: err,
    });
  }

  return res.status(500).json({
    meta: {
      status: 500,
      message,
    },
    data: error,
  });
};

const unauthorized = (res: Response, message: string = "unauthorized") => {
  return res.status(403).json({
    meta: {
      status: 403,
      message,
    },
    data: null,
  });
};

const pagination = (
  res: Response,
  data: any[],
  pagination: Pagination,
  message: string,
) => {
  return res.status(200).json({
    meta: {
      status: 200,
      message,
    },
    data,
    pagination,
  });
};

export default {
  success,
  error,
  unauthorized,
  pagination,
};
