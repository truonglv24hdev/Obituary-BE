import Route from "../../core/interface/routes.interface";
import { Router } from "express";
import ObituaryDto from "./obituary.dto";
import ObituaryController from "./obituary.controller";
import multer from "multer";
import { storageVideo, storage } from "../../core/utils/storage";
import uploadMixed from "../../core/middleware/uploadMixed ";
import authMiddleware from "../../core/middleware/auth.middleware";
import { createObituary } from "../../core/validators/obituary.validator";
const upload = multer({
  storage: storage,
});

export default class ObituaryRoute implements Route {
  public path = "/api/obituary";
  public router = Router();

  public ObituaryController = new ObituaryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @openapi
     * '/api/obituary':
     *  post:
     *     tags:
     *     - Obituary
     *     summary: Create an Obituary
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            type: object
     *            properties:
     *              quote:
     *                type: string
     *              wordsFromFamily:
     *                type: string
     *              lifeStory:
     *                type: string
     *              familyTree:
     *                type: object
     *                additionalProperties:
     *                  type: array
     *                  items:
     *                    type: object
     *                    properties:
     *                      name:
     *                        type: string
     *              favorites:
     *                type: array
     *                items:
     *                  type: string
     *              timeline:
     *                type: array
     *                items:
     *                  type: object
     *                  properties:
     *                    title:
     *                      type: string
     *                    description:
     *                      type: string
     *                    date:
     *                      type: string
     *                      format: date
     *              quoteEvent:
     *                type: string
     *              gallery:
     *                type: array
     *                items:
     *                  type: string
     *              video:
     *                type: array
     *                items:
     *                  type: string
     *     responses:
     *      200:
     *        description: Success
     *      400:
     *        description: Bad Request
     */
    this.router.post(
      this.path,
      authMiddleware,
      uploadMixed([
        { name: "photo", maxCount: 5 },
        { name: "video", maxCount: 5 },
      ]),
      createObituary,
      this.ObituaryController.createObituary
    );

    /**
     * @openapi
     * '/api/obituary':
     *  put:
     *     tags:
     *     - Obituary
     *     summary: Modify an Obituary
     *     parameters:
     *      - name: id
     *        in: path
     *        description: The unique id of the memorial
     *        required: true
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            type: object
     *            properties:
     *              quote:
     *                type: string
     *              wordsFromFamily:
     *                type: string
     *              lifeStory:
     *                type: string
     *              familyTree:
     *                type: object
     *                additionalProperties:
     *                  type: array
     *                  items:
     *                    type: object
     *                    properties:
     *                      name:
     *                        type: string
     *              favorites:
     *                type: array
     *                items:
     *                  type: string
     *              timeline:
     *                type: array
     *                items:
     *                  type: object
     *                  properties:
     *                    title:
     *                      type: string
     *                    description:
     *                      type: string
     *                    date:
     *                      type: string
     *                      format: date
     *              quoteEvent:
     *                type: string
     *              gallery:
     *                type: array
     *                items:
     *                  type: string
     *              video:
     *                type: array
     *                items:
     *                  type: string
     *     responses:
     *      200:
     *        description: Modify success
     *      404:
     *        description: Not found
     */
    this.router.put(
      this.path + "/:id",
      authMiddleware,
      uploadMixed([
        { name: "headerImage", maxCount: 1 },
        { name: "gallery", maxCount: 5 },
        { name: "video", maxCount: 5 },
        { name: "image", maxCount: 5 }
        ,
      ]),
      // createObituary,
      this.ObituaryController.updateObituaryById
    );

    this.router.post(
      this.path + "/upload",
      authMiddleware,
      upload.single("avatar"),
      this.ObituaryController.postUpload
    );

    /**
     * @openapi
     * '/api/obituary':
     *  get:
     *     tags:
     *     - Obituary
     *     summary: Get an Obituary
     *     parameters:
     *      - name: id
     *        in: path
     *        description: The unique id of the memorial
     *        required: true
     *     responses:
     *      200:
     *        description: Success
     *      404:
     *        description: Not found
     */
    this.router.get(
      this.path + "/:id",
      this.ObituaryController.getObituaryByMemorialId
    );

    this.router.get(
      this.path + "/memorial/:id",
      this.ObituaryController.getObituaryById
    );

    /**
     * @openapi
     * '/api/obituary':
     *  delete:
     *     tags:
     *     - Obituary
     *     summary: Delete an Obituary
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
      this.ObituaryController.deleteObituaryById
    );
  }
}
