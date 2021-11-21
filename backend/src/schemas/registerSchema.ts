import joi from "joi";
import { User } from "../entities/User";

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
      "any.required": "Username dibutuhkan",
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
