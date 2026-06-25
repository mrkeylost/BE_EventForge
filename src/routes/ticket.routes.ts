import express from "express";
import { handleAsync } from "../utils/catchAsync";
import {
  createTicket,
  findAllTicket,
  findAllTicketByEvent,
  findOneTicket,
  removeTicket,
  updateTicket,
} from "../controller/ticket.controller";
import { protectRoute } from "../middleware/auth.middleware";
import { accessControlList } from "../middleware/access.middleware";
import { ROLES } from "../utils/constant";

const router = express.Router();

router
  .route("/")
  .get(
    handleAsync(
      /**
    #swagger.path = '/tickets'
    #swagger.tags = ['Ticket']

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

      findAllTicket,
    ),
  )
  .post(
    [protectRoute, accessControlList([ROLES.ADMIN])],

    /**
    #swagger.path = '/tickets'
    #swagger.tags = ['Ticket']
    #swagger.security = [{
      "bearerAuth": []
    }]
    #swagger.requestBody = {
      required: true,
      schema: {$ref: "#/components/schemas/CreateTicketRequest"}
    } 
   */

    handleAsync(createTicket),
  );

router
  .route("/:id")
  .get(
    handleAsync(
      /**
    #swagger.path = '/tickets/{id}'
    #swagger.tags = ['Ticket']
   */

      findOneTicket,
    ),
  )
  .put(
    [protectRoute, accessControlList([ROLES.ADMIN])],
    handleAsync(
      /**
    #swagger.path = '/tickets/{id}'
    #swagger.tags = ['Ticket']
    #swagger.security = [{
      "bearerAuth": []
    }]
    #swagger.requestBody = {
      required: true,
      schema: {$ref: "#/components/schemas/UpdateTicketRequest"}
    } 
   */

      updateTicket,
    ),
  )
  .delete(
    [protectRoute, accessControlList([ROLES.ADMIN])],
    handleAsync(
      /**
    #swagger.path = '/tickets/{id}'
    #swagger.tags = ['Ticket']
    #swagger.security = [{
      "bearerAuth": []
    }]
   */

      removeTicket,
    ),
  );

router.route("/:eventId/event").get(
  /**
    #swagger.path = '/tickets/{eventId}/event'
    #swagger.tags = ['Ticket']
   */

  handleAsync(findAllTicketByEvent),
);

export default router;
