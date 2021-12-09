import { Request, Response } from "express";
import { getConnection } from "typeorm";
import Izin from "../entities/Izin";

const bapendaController: any = {};

type getIzinParameters = {
  nomor_izin?: string;
};

bapendaController.filter = async (req: Request, res: Response) => {
  try {
    const { nomor_izin }: getIzinParameters = req.params;

    const izins = await getConnection().query(
      `
        SELECT *
        FROM izin
        WHERE number LIKE $1
      `,
      [`%${nomor_izin}%`]
    );

    res.json(izins);
  } catch (error) {
    res.status(400).json({ message: "Bad request" });
  }
};

bapendaController.find = async (req: Request, res: Response) => {
  try {
    const { nomor_izin }: getIzinParameters = req.params;

    const izin = await Izin.find({ where: { number: nomor_izin } });

    res.json(izin);
  } catch (error) {
    res.status(400).json({ message: "Bad request" });
  }
};

export default bapendaController;
