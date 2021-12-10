import joi from "joi";

export const profileSchema = joi.object({
  username: joi.string().alphanum().min(6).max(25).required().messages({
    "any.required": "Username dibutuhkan",
    "string.min": "Username minimal 6 karakter",
    "string.max": "Username maksimal 25 karakter",
  }),
  email: joi.string().email().empty("").default(null).messages({
    "string.email": "Format email tidak diterima",
  }),
  new_password: joi.string().empty("").default(null),
  old_password: joi.string().allow(""),
});
