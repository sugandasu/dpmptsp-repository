import argon2 from "argon2";
import express from "express";
import joi from "joi";
import { User } from "../entities/User";
import { formatJoiError } from "../utils/formatJoiError";

export const registerSchema = joi.object({
  username: joi
    .string()
    .alphanum()
    .min(6)
    .max(25)
    .required()
    .external(async (value) => {
      const user = await User.findOne({ where: { username: value } });
      if (user) {
        throw new joi.ValidationError(
          "string.exists",
          [
            {
              message: "Username telah digunakan",
              path: ["username"],
              type: "string.exists",
              context: {
                key: "username",
                label: "username",
                value,
              },
            },
          ],
          value
        );
      }
    })
    .messages({
      "any.required": "Username telah terdaftar",
      "string.min": "Username minimal 6 karakter",
      "string.max": "Username maksimal 25 karakter",
    }),
  email: joi
    .string()
    .email()
    .external(async (value) => {
      const user = await User.findOne({ where: { email: value } });
      if (user) {
        throw new joi.ValidationError(
          "string.exists",
          [
            {
              message: "Email telah terdaftar",
              path: ["email"],
              type: "string.exists",
              context: {
                key: "email",
                label: "email",
                value,
              },
            },
          ],
          value
        );
      }
    })
    .messages({ "any.email": "Format email tidak diterima" }),
  password: joi
    .string()
    .required()
    .messages({ "any.required": "Password dibutuhkan" }),
});

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
    console.log("error: ", err);
    res.status(422).json({ errors: formatJoiError(err) });
  }
  return;
});
