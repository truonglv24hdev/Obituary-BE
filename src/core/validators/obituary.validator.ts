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

    body("familyTree").isObject().optional(),

    body("favorites").isArray().optional(),

    body("timeline").isArray().optional(),

    body("quoteEvent")
      .optional()
      .isLength({ min: 5 })
      .withMessage("Quote event story must be between 5 and 100 characters"),

    body("gallery").isArray().optional(),

    body("video").isArray().optional(),
  ],
  false
);

export { createObituary };
