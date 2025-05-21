import { validate, ValidationError } from "class-validator";
import { plainToInstance } from "class-transformer";
import { NextFunction, Request, RequestHandler, Response } from "express";
import HttpException from "./httpException";

const validatorMiddleware = (
  type: any,
  skipMissingProperties = false
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Ensure req.body exists
    if (!req.body) {
      req.body = {};
    }

    // Handle multipart/form-data
    if (req.files) {
      if (Array.isArray(req.files)) {
        req.body.picture = req.files.map(file => file.filename);
      } else {
        req.body.picture = [req.files.filename];
      }
    }

    try {
      const dtoObj = plainToInstance(type, req.body);
      validate(dtoObj, { skipMissingProperties }).then(
        (errors: ValidationError[]) => {
          if (errors.length > 0) {
            const message = errors
              .map((error: ValidationError) => {
                return Object.values(error.constraints!);
              })
              .join(",");
            return next(new HttpException(400, message));
          }
          next();
        }
      );
    } catch (error) {
      return next(new HttpException(400, "Invalid request body format"));
    }
  };
};

export default validatorMiddleware;