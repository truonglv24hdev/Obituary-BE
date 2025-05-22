import Route from "../../core/interface/routes.interface";
import { Router } from "express";
import MemorialController from "./memorial.controller";
import validatorMiddleware from "../../core/middleware/validation.middleware";
import multer from "multer";
import { storage } from "../../core/utils/storage";
import MemorialDto from "./memorial.dto";
import authMiddleware from "../../core/middleware/auth.middleware";

const upload = multer({
  storage: storage,
});

export default class MemorialRoute implements Route {
  public path = "/api/memorial";
  public router = Router();

  public memorialController = new MemorialController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @openapi
     * '/api/memorial':
     *  post:
     *     tags:
     *     - Memorial
     *     summary: Create a memorial
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            properties:
     *              picture:
     *                type: string
     *              first_name:
     *                type: string
     *              middle_name:
     *                type: string
     *              last_name:
     *                type: string
     *              gender:
     *                type: string
     *                enum: [Male,Female]
     *              born:
     *                type: string
     *                format: date
     *              death:
     *                type: date
     *                format: date
     *     responses:
     *      200:
     *        description: Success
     *      400:
     *        description: Bad Request
     *      404:
     *        description: Not Found
     */
    this.router.post(
      this.path,
      authMiddleware,
      upload.single("picture"),
      validatorMiddleware(MemorialDto, true),
      this.memorialController.createMemorial
    );

    /**
     * @openapi
     * '/api/memorial/{id}':
     *  put:
     *     tags:
     *     - Memorial
     *     summary: Modify a memorial
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
     *              picture:
     *                type: string
     *              first_name:
     *                type: string
     *              middle_name:
     *                type: string
     *              last_name:
     *                type: string
     *              gender:
     *                type: string
     *                enum: [Male,Female]
     *              born:
     *                type: string
     *                format: date
     *              death:
     *                type: date
     *                format: date
     *     responses:
     *      200:
     *        description: Modify
     *      400:
     *        description: Bad Request
     *      404:
     *        description: Not Found
     */
    this.router.put(
      this.path + "/:id",
      authMiddleware,
      upload.single("picture"),
      validatorMiddleware(MemorialDto, true),
      this.memorialController.updateMemorialById
    );

    /**
     * @openapi
     * '/api/memorial/{id}':
     *  get:
     *     tags:
     *     - Memorial
     *     summary: Get memorial by id
     *     parameters:
     *      - name: id
     *        in: path
     *        description: The unique id of the memorial
     *        required: true
     *     responses:
     *       200:
     *         description: Success
     *         content:
     *          application/json:
     *            schema:
     *            type: object
     *            properties:
     *              picture:
     *                type: string
     *              first_name:
     *                type: string
     *              middle_name:
     *                type: string
     *              last_name:
     *                type: string
     *              gender:
     *                type: string
     *                enum: [Male,Female]
     *              born:
     *                type: string
     *                format: date
     *              death:
     *                type: date
     *                format: date
     *       404:
     *         description: Memorial not found
     */
    this.router.get(
      this.path + "/:id",
      this.memorialController.getMemorialById
    );

    /**
     * @openapi
     * '/api/memorial/{id}':
     *  delete:
     *     tags:
     *     - Memorial
     *     summary: Delete memorial by id
     *     parameters:
     *      - name: id
     *        in: path
     *        description: The unique id of the user
     *        required: true
     *     responses:
     *       200:
     *         description: Success
     *       400:
     *         description: Bad request
     *       404:
     *         description: Memorial not found
     */
    this.router.delete(
      this.path + "/:id",
      authMiddleware,
      this.memorialController.deleteMemorial
    );
  }
}
