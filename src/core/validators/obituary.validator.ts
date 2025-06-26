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

    body("timeLine").isArray().optional(),

    body("event").isArray().optional(),

    body("gallery").isArray().optional(),

    body("video").isArray().optional(),
  ]
);

export { createObituary };
