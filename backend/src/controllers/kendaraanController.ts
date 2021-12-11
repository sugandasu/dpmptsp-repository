import axios, { AxiosResponse } from "axios";
import { Request, Response } from "express";
import { checkPajakKendaraanSchema } from "./../schemas/kendaraanSchema";
import { formatJoiError } from "./../utils/formatJoiError";

const kendaraanController: any = {};

kendaraanController.periksaPajak = async (req: Request, res: Response) => {
  const { value, error } = checkPajakKendaraanSchema.validate(req.body);

  if (error) {
    return res.status(422).json({ errors: formatJoiError(error) });
  }

  const { framenumber } = value;

  try {
    const response = await axios
      .get("http://123.231.246.164:7272/api/samapi/kend?", {
        params: {
          rangka: framenumber,
          u: "121n",
          p: "S4ms4t",
        },
      })
      .then((response: AxiosResponse) => {
        console.log(response);
        return {
          message: "Data pajak kendaraan ditemukan",
        };
      })
      .catch((error: any) => {
        console.log(error);
        return res.status(422).json({
          errors: { framenumber: "Data pajak kendaraan tidak ditemukan" },
        });
      });

    res.json(response);
  } catch (error) {
    console.log(error);
  }
  return res.status(422).json({
    message: "Terjadi kesalahan",
  });
};

export default kendaraanController;
