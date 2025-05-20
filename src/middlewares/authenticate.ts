import createHttpError from "http-errors";
import { config } from "../config/config";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export interface AuthenticatedRequest extends Request {
  user?: { userId: string };
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(
      createHttpError(401, "Authorization header missing or invalid")
    );
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return next(
      createHttpError(401, "Token missing from Authorization header")
    );
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret as string) as {
      userId: string;
    };
    (req as AuthenticatedRequest).user = { userId: decoded.userId };
    next();
  } catch (err) {
    return next(err);
  }
};
