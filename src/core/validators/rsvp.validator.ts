import { body, param, validateRequest } from "./validator";

const createRSVP = validateRequest(
  [
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

    body("wakeServiceRSVP").isObject().optional(),

    body("wakeServiceRSVP.date")
      .isString()
      .withMessage("date must be a boolean"),

    body("wakeServiceRSVP.time")
      .isString()
      .isLength({ max: 300 })
      .withMessage("Message must be under 300 characters"),

    body("wakeServiceRSVP.attending")
      .isBoolean()
      .isLength({ max: 300 })
      .withMessage("Message must be under 300 characters"),

    body("cortegeDepartureRSVP")
      .optional()
      .isBoolean()
      .withMessage("cortegeDepartureRSVP must be true or false"),

    body("cremationRSVP")
      .optional()
      .isBoolean()
      .withMessage("cremationRSVP must be true or false"),
  ],
  false
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
  ],
  false
);

export { createRSVP, updateRSVP };
