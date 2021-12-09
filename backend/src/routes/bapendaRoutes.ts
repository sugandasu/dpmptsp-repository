import express from "express";
import bapendaController from "../controllers/bapendaController";

const bapendaRoutes = express.Router();

bapendaRoutes.get("izin/filter", bapendaController.filter);

bapendaRoutes.get("izin/find", bapendaController.find);

export default bapendaRoutes;
