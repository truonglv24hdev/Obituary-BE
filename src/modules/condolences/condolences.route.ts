import Route from "../../core/interface/routes.interface";
import { Router } from "express";
import CondolencesController from "./condolences.controller";
import CondolencesDto from "./condolences.dto";
import authMiddleware from "../../core/middleware/auth.middleware";
import uploadMixed from "../../core/middleware/uploadMixed ";
import { createCondolences } from "../../core/validators/condolences.validater";

export default class CondolencesRoute implements Route {
  public path = "/api/condolences";
  public router = Router();

  public condolencesController = new CondolencesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @openapi
     * '/api/condolences/{id}':
     *  post:
     *     tags:
     *     - Condolences
     *     summary: Create a condolences
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
     *              full_name:
     *                type: string
     *              email:
     *                type: string
     *              message:
     *                type: string
     *              photo:
     *                type: string
     *              video:
     *                type: string
     *     responses:
     *      200:
     *        description: Success
     *      400:
     *        description: Bad Request
     *      404:
     *        description: Not Found
     */
    this.router.post(
      this.path + "/:id",
      authMiddleware,
      uploadMixed([
        { name: "photo", maxCount: 1 },
        { name: "video", maxCount: 1 },
      ]),
      createCondolences,
      this.condolencesController.createCondolences
    );

    /**
     * @openapi
     * '/api/condolences/{id}':
     *  post:
     *     tags:
     *     - Condolences
     *     summary: Update status a condolences
     *     parameters:
     *      - name: id
     *        in: path
     *        description: The unique id of the condolences
     *        required: true
     *     responses:
     *      200:
     *        description: Success
     *      400:
     *        description: Bad Request
     *      404:
     *        description: Not Found
     */
    this.router.put(
      this.path + "/:id",
      authMiddleware,
      this.condolencesController.updateStatusCondolences
    );

    /**
     * @openapi
     * '/api/condolences/{id}':
     *  delete:
     *     tags:
     *     - Condolences
     *     summary: Delete a condolences
     *     parameters:
     *      - name: id
     *        in: path
     *        description: The unique id of the condolences
     *        required: true
     *     responses:
     *      200:
     *        description: Success
     *      400:
     *        description: Bad Request
     *      404:
     *        description: Not Found
     */
    this.router.delete(
      this.path + "/:id",
      authMiddleware,
      this.condolencesController.deleteCondolences
    );

    this.router.get(
      this.path + "/:id",
      this.condolencesController.getCondolences
    );
  }
}
