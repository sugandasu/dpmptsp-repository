import express from "express";
import { getConnection, getRepository } from "typeorm";
import { createIzinSchema, updateIzinSchema } from "../schemas/izinSchema";
import { formatJoiError } from "../utils/formatJoiError";
import { Izin } from "./../entities/Izin";

export const izinRoutes = express.Router();

izinRoutes.get("/", async (_, res) => {
  const izins = await getRepository(Izin).createQueryBuilder("user").getMany();

  return res.json({ izins });
});

izinRoutes.post("/", async (req, res) => {
  try {
    const { number, type, name, effective_date } =
      await createIzinSchema.validateAsync(req.body);
    const izin = await Izin.create({
      number,
      type,
      name,
      effectiveDate: effective_date,
    }).save();
    return res.json({
      izin: izin,
      message: "Pembuatan izin berhasil",
    });
  } catch (err) {
    return res.status(422).json({ errors: formatJoiError(err) });
  }
});

izinRoutes.put("/:id", async (req, res) => {
  try {
    const { number, type, name, effective_date } =
      await updateIzinSchema.validateAsync(req.body);
    const izin = await Izin.findOne({ number: number });
    if (izin && izin.id !== parseInt(req.params.id)) {
      return res.status(422).json({
        errors: { number: "Izin dengan nomor tersebut telah tersimpan" },
      });
    }

    await getConnection()
      .createQueryBuilder()
      .update(Izin)
      .set({ number, type, name, effectiveDate: effective_date })
      .where("id = :id", {
        id: req.params.id,
      })
      .execute();

    return res.json({
      izin: {
        number: number,
        type: type,
        name: name,
        effectiveDate: effective_date,
      },
      message: "Pembuatan izin berhasil",
    });
  } catch (err) {
    return res.status(422).json({ errors: formatJoiError(err) });
  }
});

izinRoutes.delete("/:id", async (req, res) => {
  try {
    await Izin.delete({ id: parseInt(req.params.id) });
    return res.json({
      message: "Penghapusan izin berhasil",
    });
  } catch (err) {
    return res.status(422).json({ errors: { all: "Penghapusan izin gagal" } });
  }
});
