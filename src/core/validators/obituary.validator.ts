import { body, param, validateRequest } from "./validator";

const createObituary = validateRequest(
  [
    body("quote")
      .isString()
      .optional()
      .isLength({ min: 5 })
      .withMessage("Quote must be between 5 and 100 characters"),

    body("wordsFromFamily")
      .isString()
      .optional()
      .isLength({ min: 5 })
      .withMessage("Words from family must be between 5 and 100 characters"),

    body("lifeStory")
      .isString()
      .optional()
      .isLength({ min: 5 })
      .withMessage("Life story must be between 5 and 100 characters"),

    body("familyTree").isArray().optional(),

    body("favorites").isArray().optional(),

    body("timeline").isArray().optional(),

    body("wakeDetails").isObject().optional(),
    body("wakeDetails.description").isString().isLength({ min: 5 }).optional(),
    body("wakeDetails.location").isString().optional(),
    body("wakeDetails.date").isString().optional(),
    body("wakeDetails.timeFrom").isString().optional(),
    body("wakeDetails.timeTo").isString().optional(),

    body("cortegeDeparture").isObject().optional(),
    body("cortegeDeparture.description")
      .isString()
      .isLength({ min: 5 })
      .optional(),
    body("cortegeDeparture.location").isString().optional(),
    body("cortegeDeparture.date").isString().optional(),
    body("cortegeDeparture.time").isString().optional(),

    body("cremation").isObject().optional(),
    body("cremation.description").isString().isLength({ min: 5 }).optional(),
    body("cremation.location").isString().optional(),
    body("cremation.date").isString().optional(),
    body("cremation.time").isString().optional(),

    body("gallery").isArray().optional(),

    body("video").isArray().optional(),
  ],
  false
);

export { createObituary };
