import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

const authenticated = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers["authorization"];

  if (!authorization) {
    return res.status(401).json({
      message: "Unauthenticated",
    });
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, process.env.TOKEN_SECRET);
    req.user = payload as any;
  } catch (err) {
    return res.status(401).json({
      message: "Unauthenticated",
    });
  }

  return next();
};

export default authenticated;
