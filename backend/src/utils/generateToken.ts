import { Response } from "express";
import jwt from "jsonwebtoken";
import User from "../entities/User";

export const generateAccessToken = (user: User) => {
  return jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET, {
    expiresIn: "15s",
  });
};

export const generateRefreshToken = (user: User) => {
  return jwt.sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie(process.env.COOKIE_NAME, token, {
    httpOnly: true,
    path: "/api/v1/auth/refresh_token",
  });
};
