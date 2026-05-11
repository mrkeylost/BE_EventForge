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
   */

    getAllProvinces,
  ),
);

router.route("/:id/province").get(
  handleAsync(
    /**
    #swagger.path = '/regions/{id}/province'
    #swagger.tags = ['Region']
   */

    getProvince,
  ),
);

router.route("/:id/regency").get(
  handleAsync(
    /**
    #swagger.path = '/regions/{id}/regency'
    #swagger.tags = ['Region']
   */

    getRegency,
  ),
);

router.route("/:id/district").get(
  handleAsync(
    /**
    #swagger.path = '/regions/{id}/district'
    #swagger.tags = ['Region']
   */

    getDistrict,
  ),
);

router.route("/:id/village").get(
  handleAsync(
    /**
    #swagger.path = '/regions/{id}/village'
    #swagger.tags = ['Region']
   */

    getVillage,
  ),
);

router.route("/city-search").get(
  handleAsync(
    /**
    #swagger.path = '/regions/city-search'
    #swagger.tags = ['Region']

    #swagger.parameters['name'] = {
      in: 'query',
      required: true,
      type: 'string',
      default: ''
    }
   */

    findByCity,
  ),
);

export default router;
