import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.json({
      status: 401,
      message: "Unauthenticated",
    });
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, process.env.TOKEN_SECRET);
    req.user = payload as any;
  } catch (err) {
    return res.json({
      status: 401,
      message: "Unauthenticated",
    });
  }

  return next();
};

export default isAuth;
