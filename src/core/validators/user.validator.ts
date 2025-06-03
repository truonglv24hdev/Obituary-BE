import { body, param, validateRequest } from "./validator";

const updateUser = validateRequest(
  [
    body("first_name")
      .isString()
      .optional()
      .isLength({ min: 2 })
      .withMessage("Message must be at least 2 character"),

    body("last_name")
      .isString()
      .optional(),

    body("email")
      .isEmail()
      .optional()
      .withMessage("Invalid email format")
      .isLength({ min: 5, max: 100 })
      .withMessage("Email must be between 5 and 100 characters"),

    body("password")
      .isLength({ min: 6, max: 20 })
      .optional()
      .withMessage("Password must be between 6 and 20 characters"),

    body("address").isString().optional(),

    body("country").isString().optional(),

    body("code").isString().optional(),
  ],
  false
);

export { updateUser };
