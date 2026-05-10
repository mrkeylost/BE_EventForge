import { Request, Response } from "express";
import response from "../utils/response";
import RegionModel from "../models/Region";

export const findByCity = async (req: Request, res: Response) => {
  const { name } = req.query;
  const result = await RegionModel.findByCity(`${name}`);
  response.success(res, result, "success get region by city name");
};

export const getAllProvinces = async (req: Request, res: Response) => {
  const result = await RegionModel.getAllProvinces();
  response.success(res, result, "success get all provinces");
};

export const getProvince = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await RegionModel.getProvince(Number(id));
  response.success(res, result, "success get a province");
};

export const getRegency = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await RegionModel.getRegency(Number(id));
  response.success(res, result, "success get regencies");
};

export const getDistrict = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await RegionModel.getDistrict(Number(id));
  response.success(res, result, "success get districts");
};

export const getVillage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await RegionModel.getVillage(Number(id));
  response.success(res, result, "success get villages");
};
