import { validate, ValidationError } from "class-validator";
import { plainToInstance } from "class-transformer";
import { NextFunction, Request, RequestHandler, Response } from "express";
import HttpException from "./httpException";
import { parse } from "date-fns";

const validatorMiddleware = (
  type: any,
  skipMissingProperties = false
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.body.born) {
      try {
        if (typeof req.body.born !== 'string') {
          return next(new HttpException(400, "Born date must be a string in dd/MM/yyyy format"));
        }
        req.body.born = parse(req.body.born, "dd/MM/yyyy", new Date());
      } catch (error) {
        return next(new HttpException(400, "Invalid born date format. Please use dd/MM/yyyy"));
      }
    }
    if (req.body.death) {
      try {
        if (typeof req.body.death !== 'string') {
          return next(new HttpException(400, "Death date must be a string in dd/MM/yyyy format"));
        }
        req.body.death = parse(req.body.death, "dd/MM/yyyy", new Date());
      } catch (error) {
        return next(new HttpException(400, "Invalid death date format. Please use dd/MM/yyyy"));
      }
    }
    validate(plainToInstance(type, req.body), { skipMissingProperties }).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          const message = errors
            .map((error: ValidationError) => Object.values(error.constraints!))
            .join(",");
          return next(new HttpException(400, message));
        }
        next();
      }
    );
  };
};

export default validatorMiddleware;
