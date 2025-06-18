import Route from "../../core/interface/routes.interface";
import { Router } from "express";
import RSVPController from "./rsvp.controller";
import RSVPDto from "./rsvp.dto";
import authMiddleware from "../../core/middleware/auth.middleware";
import { createRSVP, updateRSVP } from "../../core/validators/rsvp.validator";
export default class RSVPRoute implements Route {
  public path = "/api/rsvp";
  public router = Router();

  public rsvpController = new RSVPController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @openapi
     * '/api/rsvp':
     *  post:
     *     tags:
     *     - RSVP
     *     summary: Create a rsvp
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            properties:
     *              location:
     *                type: string
     *              date:
     *                type: date
     *              time:
     *                type: string
     *              first_name:
     *                type: string
     *              last_name:
     *                type: string
     *              verification:
     *                type: boolean
     *              email:
     *                type: string
     *              contact:
     *                type: string
     *     responses:
     *      200:
     *        description: Success
     *      400:
     *        description: Bad Request
     */
    this.router.post(
      this.path,
      authMiddleware,
      // createRSVP,
      this.rsvpController.createRSVP
    );

    /**
     * @openapi
     * '/api/rsvp/{id}':
     *  put:
     *     tags:
     *     - RSVP
     *     summary: modify a rsvp
     *     parameters:
     *      - name: id
     *        in: path
     *        description: The unique id of the memorial
     *        required: true
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            properties:
     *              location:
     *                type: string
     *              date:
     *                type: date
     *              time:
     *                type: string
     *              first_name:
     *                type: string
     *              last_name:
     *                type: string
     *              verification:
     *                type: boolean
     *              email:
     *                type: string
     *              contact:
     *                type: string
     *     responses:
     *      200:
     *        description: Success
     *      400:
     *        description: Bad Request
     */
    this.router.put(
      this.path + "/:id",
      authMiddleware,
      updateRSVP,
      this.rsvpController.updateRSVPById
    );

    /**
     * @openapi
     * '/api/rsvp/{id}':
     *  get:
     *     tags:
     *     - RSVP
     *     summary: get a rsvp
     *     parameters:
     *      - name: id
     *        in: path
     *        description: The unique id of the memorial
     *        required: true
     *     responses:
     *      200:
     *        description: Success
     *      400:
     *        description: Bad Request
     */
    this.router.get(this.path + "/:id", this.rsvpController.getRSVPById);

    /**
     * @openapi
     * '/api/rsvp/{id}':
     *  delete:
     *     tags:
     *     - RSVP
     *     summary: delete a rsvp
     *     parameters:
     *      - name: id
     *        in: path
     *        description: The unique id of the memorial
     *        required: true
     *     responses:
     *      200:
     *        description: Success
     *      400:
     *        description: Bad Request
     */
    this.router.delete(
      this.path + "/:id",
      authMiddleware,
      this.rsvpController.deleteRSVPById
    );
  }
}
