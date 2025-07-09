import { body, param, validateRequest } from "./validator";

const signIn = validateRequest([
  body("email")
    .isEmail()
    .withMessage("Invalid email format")
    .isLength({ min: 5, max: 100 })
    .withMessage("Email must be between 5 and 100 characters"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be between 6 and 20 characters"),
]);

const sendLink = validateRequest([
  body("email")
    .isEmail()
    .withMessage("Invalid email format")
    .isLength({ min: 5, max: 100 })
    .withMessage("Email must be between 5 and 100 characters"),
]);

const sendOtp = validateRequest([body("otp").isString()]);

const changePassword = validateRequest([
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be between 6 and 20 characters"),

  body("confirmPassword")
    .isLength({ min: 6, max: 20 })
    .withMessage("Password must be between 6 and 20 characters"),
]);

const signUp = validateRequest([
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
    .isLength({ min: 6 })
    .withMessage("Password must be between 6 and 20 characters"),
]);

export { signIn, signUp, sendLink, sendOtp, changePassword };
