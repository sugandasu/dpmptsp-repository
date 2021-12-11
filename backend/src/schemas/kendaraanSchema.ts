import joi from "joi";

export const checkPajakKendaraanSchema = joi.object({
  framenumber: joi.string().required().messages({
    "any.required": "Nomor rangka dibutuhkan",
  }),
});
