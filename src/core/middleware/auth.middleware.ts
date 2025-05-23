import HttpException from "./httpException";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { DataStoreInToken } from "../../modules/auth/auth.interface";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("x-auth-token");

  if (!token) {
    throw new HttpException(404, "not token");
  }

  try {
    const user = jwt.verify(
      token,
      process.env.JWT_TOKEN_SECRET!
    ) as DataStoreInToken;

    if (!req.user) {
      req.user = { id: "", role: "" };
    }

    req.user.id = user.id;
    req.user.role = user.role;
    next();
  } catch (error) {
    res.status(401).json({ message: "token not vail" });
  }
};

export default authMiddleware;
