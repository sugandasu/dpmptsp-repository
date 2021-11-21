import { loginSchema } from "./../schemas/loginSchema";
import { registerSchema } from "./../schemas/registerSchema";
import argon2 from "argon2";
import express from "express";
import { User } from "../entities/User";
import { formatJoiError } from "../utils/formatJoiError";
import { v4 as uuidv4 } from "uuid";
import { getConnection } from "typeorm";

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
    res.json({
      user: { username: user.username, email: user.email },
      message: "Registrasi berhasil",
    });
  } catch (err) {
    res.status(422).json({ errors: formatJoiError(err) });
  }
  return;
});

authRoutes.post("/login", async (req, res) => {
  const validated = loginSchema.validate(req.body);
  if (validated?.error) {
    res.status(422).json({ errors: formatJoiError(validated.error) });
    return;
  }
  const { username, password } = validated.value;
  const user = await User.findOne({ where: { username } });
  console.log(user);
  if (user) {
    const validPassword = await argon2.verify(user.password, password);
    if (validPassword) {
      const token = uuidv4();

      await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({ token })
        .where("id = :id", {
          id: user.id,
        })
        .execute();
      res.json({
        user: { username: user.username, token },
        message: "Login berhasil",
      });
      return;
    }
  }
  res.status(422).json({ errors: { all: "Username atau password salah" } });
  return;
});
