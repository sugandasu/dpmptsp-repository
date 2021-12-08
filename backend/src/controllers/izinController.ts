import { Request, Response } from "express";
import { getConnection, getRepository } from "typeorm";
import { Izin } from "../entities/Izin";
import { createIzinSchema, updateIzinSchema } from "./../schemas/izinSchema";
import { formatJoiError } from "./../utils/formatJoiError";
const izinController: any = {};

izinController.getAll = async (_: Request, res: Response) => {
  const izins = await getRepository(Izin).createQueryBuilder("user").getMany();

  return res.json({ izins });
};

izinController.create = async (req: Request, res: Response) => {
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
};

izinController.getById = async (req: Request, res: Response) => {
  if (!isNaN(parseInt(req.params.id))) {
    const izin = await Izin.findOne({ id: parseInt(req.params.id) });
    if (izin) {
      return res.json({
        izin: {
          number: izin.number,
          type: izin.type,
          name: izin.name,
          effective_date: izin.effectiveDate,
        },
      });
    }
  }
  return res.status(422).json({
    errors: { all: "Izin tidak ditemukan" },
  });
};

izinController.update = async (req: Request, res: Response) => {
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
      message: "Perubahan izin berhasil",
    });
  } catch (err) {
    return res.status(422).json({ errors: formatJoiError(err) });
  }
};

izinController.delete = async (req: Request, res: Response) => {
  try {
    await Izin.delete({ id: parseInt(req.params.id) });
    return res.json({
      message: "Penghapusan izin berhasil",
    });
  } catch (err) {
    return res.status(422).json({ errors: { all: "Penghapusan izin gagal" } });
  }
};

export default izinController;
