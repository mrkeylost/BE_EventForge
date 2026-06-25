import express from "express";
import { handleAsync } from "../utils/catchAsync";
import {
  createBanner,
  findAllBanner,
  findOneBanner,
  removeBanner,
  updateBanner,
} from "../controller/banner.controller";
import { protectRoute } from "../middleware/auth.middleware";
import { accessControlList } from "../middleware/access.middleware";
import { ROLES } from "../utils/constant";

const router = express.Router();

router
  .route("/")
  .get(
    handleAsync(
      /**
    #swagger.path = '/banners'
    #swagger.tags = ['Banner']

    #swagger.parameters['page'] = {
      in: 'query',
      required: false,
      type: 'integer',
      default: 1
    }

    #swagger.parameters['limit'] = {
      in: 'query',
      required: false,
      type: 'integer',
      default: 10
    }

    #swagger.parameters['search'] = {
      in: 'query',
      required: false,
      type: 'string',
      default: ''
    }
   */

      findAllBanner,
    ),
  )
  .post(
    [protectRoute, accessControlList([ROLES.ADMIN])],

    /**
    #swagger.path = '/banners'
    #swagger.tags = ['Banner']
    #swagger.security = [{
      "bearerAuth": []
    }]
    #swagger.requestBody = {
      required: true,
      schema: {$ref: "#/components/schemas/CreateBannerRequest"}
    } 
   */

    handleAsync(createBanner),
  );

router
  .route("/:id")
  .get(
    handleAsync(
      /**
    #swagger.path = '/banners/{id}'
    #swagger.tags = ['Banner']
   */

      findOneBanner,
    ),
  )
  .put(
    [protectRoute, accessControlList([ROLES.ADMIN])],
    handleAsync(
      /**
    #swagger.path = '/banners/{id}'
    #swagger.tags = ['Banner']
    #swagger.security = [{
      "bearerAuth": []
    }]
    #swagger.requestBody = {
      required: true,
      schema: {$ref: "#/components/schemas/UpdateBannerRequest"}
    } 
   */

      updateBanner,
    ),
  )
  .delete(
    [protectRoute, accessControlList([ROLES.ADMIN])],
    handleAsync(
      /**
    #swagger.path = '/banners/{id}'
    #swagger.tags = ['Banner']
    #swagger.security = [{
      "bearerAuth": []
    }]
   */

      removeBanner,
    ),
  );

export default router;
