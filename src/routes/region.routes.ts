import express from "express";
import { handleAsync } from "../utils/catchAsync";
import {
  findByCity,
  getAllProvinces,
  getDistrict,
  getProvince,
  getRegency,
  getVillage,
} from "../controller/region.controller";

const router = express.Router();

router.route("/").get(
  handleAsync(
    /**
    #swagger.path = '/regions'
    #swagger.tags = ['Region']
    #swagger.requestBody = {
      required: true,
      schema: {$ref: "#/components/schemas/GetallProvincesRequest"}
    } 
   */

    getAllProvinces,
  ),
);

router.route("/:id/province").get(
  handleAsync(
    /**
    #swagger.path = '/regions/{id}/province'
    #swagger.tags = ['Region']
    #swagger.requestBody = {
      required: true,
      schema: {$ref: "#/components/schemas/GetProvinceRequest"}
    } 
   */

    getProvince,
  ),
);

router.route("/:id/regency").get(
  handleAsync(
    /**
    #swagger.path = '/regions/{id}/regency'
    #swagger.tags = ['Region']
    #swagger.requestBody = {
      required: true,
      schema: {$ref: "#/components/schemas/GetRegencyRequest"}
    } 
   */

    getRegency,
  ),
);

router.route("/:id/district").get(
  handleAsync(
    /**
    #swagger.path = '/regions/{id}/district'
    #swagger.tags = ['Region']
    #swagger.requestBody = {
      required: true,
      schema: {$ref: "#/components/schemas/GetDistrictRequest"}
    } 
   */

    getDistrict,
  ),
);

router.route("/:id/village").get(
  handleAsync(
    /**
    #swagger.path = '/regions/{id}/village'
    #swagger.tags = ['Region']
    #swagger.requestBody = {
      required: true,
      schema: {$ref: "#/components/schemas/GetVillageRequest"}
    } 
   */

    getVillage,
  ),
);

router.route("/city-search").get(
  handleAsync(
    /**
    #swagger.path = '/regions'
    #swagger.tags = ['Region']
    #swagger.requestBody = {
      required: true,
      schema: {$ref: "#/components/schemas/FindByCityRequest"}
    } 
   */

    findByCity,
  ),
);

export default router;
