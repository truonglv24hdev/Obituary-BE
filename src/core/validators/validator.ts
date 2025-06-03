import { NextFunction, Request, Response } from "express";
import { query, body, param, validationResult } from "express-validator";

const validateRequest = (rules: any[], fileRequired: boolean = true) => [
  ...rules,
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (fileRequired && !req.file) {
      return res.status(400).json({
        errors: [
          { msg: "Image file is required", param: "file", location: "body" },
        ],
      });
    }

    // Optional: validate mimetype
    if (req.file) {
      const allowedTypes = ["image/jpeg", "image/png"];
      if (!allowedTypes.includes(req.file.mimetype)) {
        return res.status(400).json({
          errors: [
            {
              msg: "Only JPEG and PNG files are allowed",
              param: "file",
              location: "body",
            },
          ],
        });
      }
    }

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export { query, body, param, validateRequest };
