import { Request, Response, NextFunction } from "express";
import {
  validationResult,
  ValidationChain,
  query,
  body,
  param,
} from "express-validator";

export const validateRequest = (rules: ValidationChain[]) => {
  const middleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  };

  return [...rules, middleware];
};

export { query, body, param };
