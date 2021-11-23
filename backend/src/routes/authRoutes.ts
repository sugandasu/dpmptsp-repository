import argon2 from "argon2";
import express from "express";
import { getConnection } from "typeorm";
import { User } from "../entities/User";
import { authenticateToken } from "../utils/authenticateToken";
import { formatJoiError } from "../utils/formatJoiError";
import { loginSchema } from "./../schemas/loginSchema";
import { registerSchema } from "./../schemas/registerSchema";
import { generateAccessToken } from "./../utils/generateAccessToken";

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

      return res.json({
        user: { username: user.username, token },
        message: "Login berhasil",
      });
    }
  }
  return res
    .status(422)
    .json({ errors: { all: "Username atau password salah" } });
});

authRoutes.post("/logout", authenticateToken, async (req, res) => {
  const user = await User.findOne({ where: { username: req?.user?.username } });
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
