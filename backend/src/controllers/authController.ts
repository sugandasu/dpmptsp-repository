import argon2 from "argon2";
import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import User from "../entities/User";
import { loginSchema } from "./../schemas/loginSchema";
import { registerSchema } from "./../schemas/registerSchema";
import { formatJoiError } from "./../utils/formatJoiError";
import {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
} from "./../utils/generateToken";

const authController: any = {};

authController.me = async (req: Request, res: Response) => {
  const user = await User.findOne({ id: req?.user?.userId });
  if (user) {
    return res.json({
      status: 200,
      user: { username: user.username, role: user.role },
    });
  }

  return res.json({
    status: 401,
    message: "Unauthenticated",
  });
};

authController.register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = await registerSchema.validateAsync(
      req.body
    );
    const hashedPassword = await argon2.hash(password);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    }).save();
    return res.json({
      user: { username: user.username, email: user.email },
      message: "Registrasi berhasil",
    });
  } catch (err) {
    return res.status(422).json({ errors: formatJoiError(err) });
  }
};

authController.login = async (req: Request, res: Response) => {
  const validated = loginSchema.validate(req.body);
  if (validated?.error) {
    res.status(422).json({ errors: formatJoiError(validated.error) });
  }
  const { username, password } = validated.value;
  const user = await User.findOne({ where: { username } });
  if (user) {
    const validPassword = await argon2.verify(user.password, password);
    if (validPassword) {
      const token = generateAccessToken(user);
      sendRefreshToken(res, generateRefreshToken(user));

      return res.json({
        user: { username: user.username, role: user.role },
        accessToken: token,
        message: "Login berhasil",
      });
    }
  }

  return res.status(422).json({
    errors: {
      username: "Username atau password salah",
      password: "Username atau password salah",
    },
  });
};

authController.logout = async (_: Request, res: Response) => {
  sendRefreshToken(res, "");

  return res.json({
    message: "Logout berhasil",
  });
};

authController.refreshToken = async (req: Request, res: Response) => {
  const token = req.cookies[process.env.COOKIE_NAME];
  if (!token) {
    return res.json({
      status: 401,
      message: "Unauthenticated",
    });
  }

  let cookie: any = null;
  try {
    cookie = verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    return res.json({
      status: 401,
      message: "Unauthenticated",
    });
  }

  const user = await User.findOne({ id: cookie.userId });
  if (!user) {
    return res.json({
      status: 401,
      message: "Unauthenticated",
    });
  }

  if (user.tokenVersion !== cookie.tokenVersion) {
    return res.json({
      status: 401,
      message: "Unauthenticated",
    });
  }

  sendRefreshToken(res, generateRefreshToken(user));

  return res.send({ status: 200, accessToken: generateAccessToken(user) });
};

export default authController;
