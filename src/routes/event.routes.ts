import express from "express";
import { handleAsync } from "../utils/catchAsync";
import {
  createEvent,
  findAllEvent,
  findOneBySlug,
  findOneEvent,
  removeEvent,
  updateEvent,
} from "../controller/event.constroller";
import { protectRoute } from "../middleware/auth.middleware";
import { accessControlList } from "../middleware/access.middleware";
import { ROLES } from "../utils/constant";

const router = express.Router();

router
  .route("/")
  .get(
    handleAsync(
      /**
    #swagger.path = '/events'
    #swagger.tags = ['Event']
    #swagger.requestBody = {
      required: true,
      schema: {$ref: "#/components/schemas/FindAllEventRequest"}
    } 
   */

      findAllEvent,
    ),
  )
  .post(
    [protectRoute, accessControlList([ROLES.ADMIN])],

    /**
    #swagger.path = '/events'
    #swagger.tags = ['Event']
    #swagger.requestBody = {
      required: true,
      schema: {$ref: "#/components/schemas/CreateEventRequest"}
    } 
   */

    handleAsync(createEvent),
  );

router
  .route("/:id")
  .get(
    handleAsync(
      /**
    #swagger.path = '/events/{id}'
    #swagger.tags = ['Event']
    #swagger.requestBody = {
      required: true,
      schema: {$ref: "#/components/schemas/FindOneEventRequest"}
    } 
   */

      findOneEvent,
    ),
  )
  .put(
    [protectRoute, accessControlList([ROLES.ADMIN])],
    handleAsync(
      /**
    #swagger.path = '/events/{id}'
    #swagger.tags = ['Event']
    #swagger.requestBody = {
      required: true,
      schema: {$ref: "#/components/schemas/UpdateEventRequest"}
    } 
   */

      updateEvent,
    ),
  )
  .delete(
    [protectRoute, accessControlList([ROLES.ADMIN])],
    handleAsync(
      /**
    #swagger.path = '/events/{id}'
    #swagger.tags = ['Event']
    #swagger.requestBody = {
      required: true,
      schema: {$ref: "#/components/schemas/DeleteEventRequest"}
    } 
   */

      removeEvent,
    ),
  );

router.route("/:slug/slug").get(
  /**
    #swagger.path = '/events/{id}/slug'
    #swagger.tags = ['Event']
    #swagger.requestBody = {
      required: true,
      schema: {$ref: "#/components/schemas/FindOneBySlugRequest"}
    } 
   */

  handleAsync(findOneBySlug),
);

export default router;
