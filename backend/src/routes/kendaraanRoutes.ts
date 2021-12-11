import express from "express";
import kendaraanController from "../controllers/kendaraanController";

import isAuth from "../middlewares/isAuth";

const kendaraanRoutes = express.Router();

kendaraanRoutes.post(
  "/periksa-pajak",
  isAuth,
  kendaraanController.periksaPajak
);

export default kendaraanRoutes;
