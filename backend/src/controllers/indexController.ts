import { getConnection } from "typeorm";
import { Request, Response } from "express";

const indexController: any = {};

indexController.get = async (_: Request, res: Response) => {
  const resultIzin = await getConnection().query(
    `
    SELECT COUNT(izin.id) as total FROM izin
  `,
    []
  );

  console.log(resultIzin);

  return res.json({ totalIzin: resultIzin[0].total });
};

export default indexController;
