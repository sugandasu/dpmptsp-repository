import express from "express";
import joi from "joi";
import { formatJoiError } from "../utils/formatJoiError";

export const registerSchema = joi.object({
  username: joi.string().alphanum().min(6).max(25).required().messages({
    "any.required": "Username dibutuhkan",
    "string.min": "Username minimal 6 karakter",
    "string.max": "Username maksimal 25 karakter",
  }),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  password: joi.string().required(),
});

export const authRoutes = express.Router();
authRoutes.post("/register", (req, res) => {
  const errors = registerSchema.validate(req.body);
  if (errors) {
    res.status(422).json({ errors: formatJoiError(errors) });
  }
});
