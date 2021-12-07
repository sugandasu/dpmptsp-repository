import argon2 from "argon2";
import express from "express";
import { authenticated } from "../middlewares/Authenticated";
import { getConnection } from "typeorm";
import { User } from "../entities/User";
import { formatJoiError } from "../utils/formatJoiError";
import { generateAccessToken, sendRefreshToken } from "../utils/generateToken";
import { loginSchema } from "./../schemas/loginSchema";
import { registerSchema } from "./../schemas/registerSchema";
import { generateRefreshToken } from "./../utils/generateToken";
import { verify } from "jsonwebtoken";

export const authRoutes = express.Router();

authRoutes.post("/register", async (req, res) => {
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
});

authRoutes.post("/login", async (req, res) => {
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

      await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({ token })
        .where("id = :id", {
          id: user.id,
        })
        .execute();

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
});

authRoutes.post("/logout", authenticated, async (req, res) => {
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
      message: "Logout berhasil",
    });
  }

  return res.json({
    message: "Logout berhasil",
  });
});

authRoutes.get("/me", authenticated, async (req, res) => {
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
      user: { username: user.username, role: user.role },
    });
  }

  return res.status(401).json({
    message: "Unauthenticated",
  });
});

authRoutes.post("/refresh_token", async (req, res) => {
  const token = req.cookies[process.env.COOKIE_NAME];
  if (!token) {
    return res.send({ accessToken: "" });
  }

  let cookie: any = null;
  try {
    cookie = verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    return res.send({ accessToken: "" });
  }

  const user = await User.findOne({ id: cookie.userId });
  if (!user) {
    return res.send({ accessToken: "" });
  }

  if (user.tokenVersion !== cookie.tokenVersion) {
    return res.send({ accessToken: "" });
  }

  sendRefreshToken(res, generateRefreshToken(user));

  return res.send({ accessToken: generateAccessToken(user) });
});
