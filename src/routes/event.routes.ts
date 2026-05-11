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

      findAllEvent,
    ),
  )
  .post(
    [protectRoute, accessControlList([ROLES.ADMIN])],

    /**
    #swagger.path = '/events'
    #swagger.tags = ['Event']
    #swagger.security = [{
      "bearerAuth": []
    }]
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
    #swagger.security = [{
      "bearerAuth": []
    }]
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
    #swagger.security = [{
      "bearerAuth": []
    }]
   */

      removeEvent,
    ),
  );

router.route("/:slug/slug").get(
  /**
    #swagger.path = '/events/{slug}/slug'
    #swagger.tags = ['Event']
   */

  handleAsync(findOneBySlug),
);

export default router;
