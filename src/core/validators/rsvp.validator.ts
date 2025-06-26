import { body, param, validateRequest } from "./validator";

const createRSVP = validateRequest(
  [
    body("first_name")
      .isString()
      .isLength({ min: 2, max: 100 })
      .withMessage("First name must be between 5 and 100 characters"),

    body("last_name")
      .isString()
      .isLength({ min: 2, max: 100 }),

    body("email")
      .optional()
      .isEmail(),

    body("contact")
      .optional()
      .isString(),
    
    body("obituaryId").optional(),
    body("wakeService").optional().customSanitizer((value) => {
      try {
        return typeof value === "string" ? JSON.parse(value) : value;
      } catch (e) {
        return {};
      }
    }),
    body("cortegeDeparture").optional().customSanitizer((value) => {
      try {
        return typeof value === "string" ? JSON.parse(value) : value;
      } catch (e) {
        return {};
      }
    }),
    body("cremation").optional().customSanitizer((value) => {
      try {
        return typeof value === "string" ? JSON.parse(value) : value;
      } catch (e) {
        return {};
      }
    }),
  ]
);

const updateRSVP = validateRequest(
  [
    param("id").isString(),

    body("location")
      .isString()
      .optional()
      .isLength({ min: 5, max: 100 })
      .withMessage("Location must be between 5 and 100 characters"),

    body("date")
      .isString()
      .optional()
      .isLength({ min: 5, max: 100 })
      .withMessage("Date must be between 5 and 100 characters"),

    body("time").isString().optional().isLength({ min: 3, max: 100 }),

    body("first_name")
      .isString()
      .isLength({ min: 2, max: 100 })
      .withMessage("First name must be between 5 and 100 characters"),

    body("last_name")
      .isString()
      .isLength({ min: 2, max: 100 })
      .withMessage("Last name must be between 5 and 100 characters"),

    body("email")
      .isEmail()
      .isLength({ min: 2, max: 100 })
      .withMessage("Email must be between 5 and 100 characters"),

    body("contact")
      .isString()
      .isLength({ min: 10, max: 100 })
      .withMessage("Contact must be between 5 and 100 characters"),
  ]
);

export { createRSVP, updateRSVP };
