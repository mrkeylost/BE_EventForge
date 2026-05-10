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
    #swagger.requestBody = {
      required: true,
      schema: {$ref: "#/components/schemas/FindAllCategoryRequest"}
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
    #swagger.requestBody = {
      required: true,
      schema: {$ref: "#/components/schemas/FindOneCategoryRequest"}
    } 
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
    #swagger.requestBody = {
      required: true,
      schema: {$ref: "#/components/schemas/RemoveCategoryRequest"}
    } 
   */

      removeCategory,
    ),
  );

export default router;
