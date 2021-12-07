import jwt from "jsonwebtoken";
import { User } from "../entities/User";

export const generateAccessToken = (user: User) => {
  if (user) {
    return jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET, {
      expiresIn: "15m",
    });
  }

  return null;
};

export const generateRefreshToken = (user: User) => {
  if (user) {
    return jwt.sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });
  }

  return null;
};
