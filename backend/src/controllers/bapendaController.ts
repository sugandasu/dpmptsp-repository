import { Request, Response } from "express";
import { getConnection } from "typeorm";
import Izin from "../entities/Izin";

const bapendaController: any = {};

type getIzinParameters = {
  nomor_izin?: string;
};

bapendaController.filter = async (req: Request, res: Response) => {
  res.set("Access-Control-Allow-Origin", "*");

  try {
    const { nomor_izin }: getIzinParameters = req.query;

    const izins = await getConnection().query(
      `
        SELECT *
        FROM izin
        WHERE number LIKE "%${nomor_izin}%"
      `
    );

    if (izins.length > 0) {
      res.json({ status: 200, izins });
    }

    res.json({
      status: 404,
      message: "Tidak ada izin yang ditemukan",
      izins: [],
    });
  } catch (error) {
    res.json({ status: 400, message: "Bad request" });
  }
};

bapendaController.find = async (req: Request, res: Response) => {
  res.set("Access-Control-Allow-Origin", "*");

  try {
    const { nomor_izin }: getIzinParameters = req.query;
    const izin = await Izin.findOne({ where: { number: nomor_izin } });

    if (izin) {
      res.json({ status: 200, izin });
    }

    res.json({ status: 404, message: "Izin tidak ditemukan", izin: null });
  } catch (error) {
    res.json({ status: 400, message: "Bad request" });
  }
};

export default bapendaController;
