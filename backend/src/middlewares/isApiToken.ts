import { NextFunction, Request, Response } from "express";
import User from "../entities/User";

const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;
  const api_token = req.query.api_token;

  let token: any = authorization || api_token;

  if (!token) {
    return res.json({
      status: 401,
      message: "Unauthenticated",
    });
  }

  try {
    if (authorization) {
      token = authorization.split(" ")[1];
    }

    const user = await User.findOne({ apiToken: token as string });
    if (!user) {
      return res.json({
        status: 401,
        message: "Unauthenticated",
      });
    }
    req.user = { userId: user.id };
  } catch (err) {
    return res.json({
      status: 401,
      message: "Unauthenticated",
    });
  }

  return next();
};

export default isAuth;
