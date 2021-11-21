import joi from "joi";

export const loginSchema = joi.object({
  username: joi.string().alphanum().required().messages({
    "any.required": "Username telah terdaftar",
  }),
  password: joi
    .string()
    .required()
    .messages({ "any.required": "Password dibutuhkan" }),
});
