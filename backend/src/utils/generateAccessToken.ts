import jwt from "jsonwebtoken";
import { User } from "../entities/User";

export const generateAccessToken = (user: User) => {
  if (user) {
    return jwt.sign(
      { username: user.username, role: user.role },
      process.env.TOKEN_SECRET,
      { expiresIn: "1800s" }
    );
  }

  return null;
};
