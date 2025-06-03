import dayjs from "dayjs";
import { body, param, validateRequest } from "./validator";

const createMemorial = validateRequest([
  body("first_name")
    .isString()
    .isLength({ min: 2 })
    .withMessage("Message must be at least 2 character"),

  body("middle_name")
    .isString()
    .isLength({ min: 2 })
    .withMessage("Message must be at least 2 character"),

  body("gender").isString().isIn(["MALE", "FEMALE"]),

  body("born").custom((value) => {
    if (!dayjs(value, "DD/MM/YYYY", true).isValid()) {
      throw new Error("Invalid date format, must be DD/MM/YYYY");
    }
    return true;
  }),

  body("death").custom((value) => {
    if (!dayjs(value, "DD/MM/YYYY", true).isValid()) {
      throw new Error("Invalid date format, must be DD/MM/YYYY");
    }
    return true;
  }),

  body("slug").isString(),
]);

export { createMemorial };
