import dayjs from "dayjs";
import { body, param, validateRequest } from "./validator";

const createCondolences = validateRequest([
  body("full_name")
    .isString()
    .isLength({ min: 2 })
    .withMessage("Full name must be at least 2 character"),

  body("email")
    .isEmail()
    .optional()
    .withMessage("Invalid email format")
    .isLength({ min: 5, max: 100 })
    .withMessage("Email must be between 5 and 100 characters"),

  body("message").isString().optional(),
]);

export { createCondolences };
