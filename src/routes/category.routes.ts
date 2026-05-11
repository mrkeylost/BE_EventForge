import express from "express";
import { handleAsync } from "../utils/catchAsync";
import {
  createCategory,
  findAllCategory,
  findOneCategory,
  removeCategory,
  updateCategory,
} from "../controller/category.controller";
import { protectRoute } from "../middleware/auth.middleware";
import { accessControlList } from "../middleware/access.middleware";
import { ROLES } from "../utils/constant";

const router = express.Router();

router
  .route("/")
  .get(
    handleAsync(
      /**
    #swagger.path = '/category'
    #swagger.tags = ['Category']

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

      findAllCategory,
    ),
  )
  .post(
    [protectRoute, accessControlList([ROLES.ADMIN])],

    /**
    #swagger.path = '/category'
    #swagger.tags = ['Category']
    #swagger.security = [{
    "bearerAuth": []
   }]
    #swagger.requestBody = {
      required: true,
      schema: {$ref: "#/components/schemas/CreateCategoryRequest"}
    } 
   */

    handleAsync(createCategory),
  );

router
  .route("/:id")
  .get(
    handleAsync(
      /**
    #swagger.path = '/category/{id}'
    #swagger.tags = ['Category']
   */

      findOneCategory,
    ),
  )
  .put(
    [protectRoute, accessControlList([ROLES.ADMIN])],
    handleAsync(
      /**
    #swagger.path = '/category/{id}'
    #swagger.tags = ['Category']
    #swagger.security = [{
      "bearerAuth": []
    }]
    #swagger.requestBody = {
      required: true,
      schema: {$ref: "#/components/schemas/UpdateCategoryRequest"}
    } 
   */

      updateCategory,
    ),
  )
  .delete(
    [protectRoute, accessControlList([ROLES.ADMIN])],
    handleAsync(
      /**
    #swagger.path = '/category/{id}'
    #swagger.tags = ['Category']
    #swagger.security = [{
      "bearerAuth": []
    }]
   */

      removeCategory,
    ),
  );

export default router;
