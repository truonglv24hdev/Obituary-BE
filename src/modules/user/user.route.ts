import Route from "../../core/interface/routes.interface";
import { Router } from "express";
import UsersController from "./user.controller";
import UserInfoDto from "./user.dto";
import multer from "multer";
import { storage } from "../../core/utils/storage";
const upload = multer({
  storage: storage,
});
import authMiddleware from "../../core/middleware/auth.middleware";
import { updateUser } from "../../core/validators/user.validator";
export default class UserRoute implements Route {
  public path = "/api/user";
  public router = Router();

  public userController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.put(this.path + "/:id", this.userController.updateUserByAdmin);

    /**
     * @openapi
     * '/api/user/{id}':
     *  put:
     *     tags:
     *     - User
     *     summary: Modify a user
     *     parameters:
     *      - name: id
     *        in: path
     *        description: The unique id of the user
     *        required: true
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            properties:
     *              first_name:
     *                type: string
     *              last_name:
     *                type: string
     *              email:
     *                type: string
     *              memorials:
     *                type: array
     *                items:
     *                  type: string
     *              address:
     *                type: string
     *              country:
     *                type: string
     *              code:
     *                type: string
     *     responses:
     *      200:
     *        description: Modified
     *      400:
     *        description: Bad Request
     *      404:
     *        description: Not Found
     */
    this.router.put(
      this.path,
      authMiddleware,
      updateUser,
      this.userController.updateUserById
    );

    this.router.get(
      this.path + "/profile",
      authMiddleware,
      this.userController.getUserById
    );

    this.router.get(this.path + "/:id", this.userController.getUser);

    /**
     * @openapi
     * '/api/user':
     *  get:
     *     tags:
     *     - User
     *     summary: Get all users
     *     responses:
     *       200:
     *         description: Success
     *         content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                type: object
     *                properties:
     *                  id:
     *                    type: number
     *                  first_name:
     *                    type: string
     *                  last_name:
     *                    type: string
     *                  email:
     *                    type: string
     *                  memorials:
     *                    type: array
     *                    items:
     *                      type: string
     *                  address:
     *                    type: string
     *                  country:
     *                    type: string
     *                  code:
     *                    type: string
     *       400:
     *         description: Bad request
     */
    this.router.get(this.path, this.userController.getUserPagination);

    /**
     * @openapi
     * '/api/user/{id}':
     *  get:
     *     tags:
     *     - User
     *     summary: Get user by id
     *     parameters:
     *      - name: id
     *        in: path
     *        description: The unique id of the user
     *        required: true
     *     responses:
     *       200:
     *         description: Success
     *         content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                type: object
     *                properties:
     *                  id:
     *                    type: number
     *                  first_name:
     *                    type: string
     *                  last_name:
     *                    type: string
     *                  email:
     *                    type: string
     *                  memorials:
     *                    type: array
     *                    items:
     *                      type: string
     *                  address:
     *                    type: string
     *                  country:
     *                    type: string
     *                  code:
     *                    type: string
     *       400:
     *         description: Bad request
     */

    /**
     * @openapi
     * '/api/user/{id}':
     *  delete:
     *     tags:
     *     - User
     *     summary: Delete user by id
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
     */
    this.router.delete(this.path + "/:id", this.userController.deleteUser);
  }
}
