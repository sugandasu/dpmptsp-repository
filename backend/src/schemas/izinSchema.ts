import joi from "joi";
import Izin, { IzinTypes } from "../entities/Izin";
import { enumToArray } from "../utils/enumToArray";

export const createIzinSchema = joi.object({
  number: joi
    .string()
    .required()
    .external(async (value) => {
      const izin = await Izin.findOne({ where: { number: value } });
      if (izin) {
        throw new joi.ValidationError(
          "string.exists",
          [
            {
              message: "Izin dengan nomor tersebut telah tersimpan",
              path: ["number"],
              type: "string.exists",
              context: {
                key: "number",
                label: "number",
                value,
              },
            },
          ],
          value
        );
      }
    })
    .messages({
      "any.required": "Nomor izin dibutuhkan",
    }),
  type: joi
    .string()
    .required()
    .valid(...enumToArray(IzinTypes))
    .messages({
      "any.required": "Tipe izin dibutuhkan",
      "any.valid": "Tipe izin tidak valid",
    }),
  name: joi.string().required().messages({ "any.required": "Nama dibutuhkan" }),
  effective_date: joi.date().required().messages({
    "any.required": "Tanggal belaku dibutuhkan",
    date: "Format tanggal salah",
  }),
});

export const updateIzinSchema = joi.object({
  number: joi.string().required().messages({
    "any.required": "Nomor izin dibutuhkan",
  }),
  type: joi
    .string()
    .required()
    .valid(...enumToArray(IzinTypes))
    .messages({
      "any.required": "Tipe izin dibutuhkan",
      "any.valid": "Tipe izin tidak valid",
    }),
  name: joi.string().required().messages({ "any.required": "Nama dibutuhkan" }),
  effective_date: joi.date().required().messages({
    "any.required": "Tanggal belaku dibutuhkan",
    date: "Format tanggal salah",
  }),
});
