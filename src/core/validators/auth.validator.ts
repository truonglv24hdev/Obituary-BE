import { body, param, validateRequest } from "./validator";

const signIn = validateRequest(
  [
    body("email")
      .isEmail()
      .withMessage("Invalid email format")
      .isLength({ min: 5, max: 100 })
      .withMessage("Email must be between 5 and 100 characters"),

    body("password")
      .isLength({ min: 6, max: 20 })
      .withMessage("Password must be between 6 and 20 characters"),
  ],
  false
);

const signUp = validateRequest(
  [
    body("first_name")
      .isString()
      .isLength({ min: 2 })
      .withMessage("Message must be at least 2 character"),

    body("email")
      .isEmail()
      .withMessage("Invalid email format")
      .isLength({ min: 5, max: 100 })
      .withMessage("Email must be between 5 and 100 characters"),

    body("password")
      .isLength({ min: 6, max: 20 })
      .withMessage("Password must be between 6 and 20 characters"),
  ],
  false
);

export { signIn, signUp };
