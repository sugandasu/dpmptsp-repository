import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserReqType } from "../types/myContext";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null || token === undefined || token === "") {
    return res.sendStatus(401);
  }

  jwt.verify(
    token,
    process.env.TOKEN_SECRET,
    (err: any, user: UserReqType | any) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      return next();
    }
  );
  return;
};
