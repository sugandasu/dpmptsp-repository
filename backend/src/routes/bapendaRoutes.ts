import express from "express";
import isApiToken from "../middlewares/isApiToken";
import bapendaController from "../controllers/bapendaController";

const bapendaRoutes = express.Router();

bapendaRoutes.get("/", isApiToken, (_, res) => {
  res.send("Bapenda route");
});

bapendaRoutes.get("/izin/filter", isApiToken, bapendaController.filter);

bapendaRoutes.get("/izin/find", isApiToken, bapendaController.find);

export default bapendaRoutes;
