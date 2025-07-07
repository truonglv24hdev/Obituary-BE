import dayjs from "dayjs";
import { body, param, validateRequest } from "./validator";

const createCondolences = validateRequest([
  body("full_name")
    .isString()
    .isLength({ min: 2 })
    .withMessage("Full name must be at least 2 character"),

  body("email")
    .optional(),

  body("message").isString().optional(),
]);

export { createCondolences };
