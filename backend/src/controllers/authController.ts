import argon2 from "argon2";
import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { getConnection } from "typeorm";
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

  return res
    .status(422)
    .json({ errors: { all: "Username atau password salah" } });
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
    return res.status(401).json({
      message: "Unauthenticated",
    });
  }

  let cookie: any = null;
  try {
    cookie = verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    return res.status(401).json({
      message: "Unauthenticated",
    });
  }

  const user = await User.findOne({ id: cookie.userId });
  if (!user) {
    return res.status(401).json({
      message: "Unauthenticated",
    });
  }

  if (user.tokenVersion !== cookie.tokenVersion) {
    return res.status(401).json({
      message: "Unauthenticated",
    });
  }

  sendRefreshToken(res, generateRefreshToken(user));

  return res.send({ accessToken: generateAccessToken(user) });
};

authController.me = async (req: Request, res: Response) => {
  const user = await User.findOne({ id: req?.user?.userId });
  if (user) {
    return res.json({
      user: { username: user.username, role: user.role },
    });
  }

  return res.status(401).json({
    message: "Unauthenticated",
  });
};

authController.getApiToken = async (req: Request, res: Response) => {
  const user = await User.findOne({ id: req?.user?.userId });
  if (user) {
    return res.json({
      apiToken: user.token,
    });
  }

  return res.status(401).json({
    message: "Unauthenticated",
  });
};

authController.refreshApiToken = async (req: Request, res: Response) => {
  const user = await User.findOne({ id: req?.user?.userId });
  if (user) {
    const token = generateAccessToken(user);
    await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({ token })
      .where("id = :id", {
        id: user.id,
      })
      .execute();

    return res.json({
      token: user.token,
    });
  }

  return res.status(401).json({
    message: "Unauthenticated",
  });
};

authController.revokeApiToken = async (req: Request, res: Response) => {
  const user = await User.findOne({ id: req?.user?.userId });
  if (user) {
    await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({ token: null })
      .where("id = :id", {
        id: user.id,
      })
      .execute();

    return res.json({
      token: null,
    });
  }

  return res.status(401).json({
    message: "Unauthenticated",
  });
};

export default authController;
