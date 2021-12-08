import express from "express";
import izinController from "src/controllers/izinController";
import { getConnection, getRepository } from "typeorm";
import { createIzinSchema, updateIzinSchema } from "../schemas/izinSchema";
import { formatJoiError } from "../utils/formatJoiError";
import { Izin } from "./../entities/Izin";

export const izinRoutes = express.Router();

izinRoutes.get("/", izinController.getAll);

izinRoutes.post("/", izinController.create);

izinRoutes.get("/:id", izinController.getById);

izinRoutes.put("/:id", izinController.update);

izinRoutes.delete("/:id", izinController.delete);
