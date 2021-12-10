import express from "express";
import izinController from "../controllers/izinController";
import isAuth from "../middlewares/isAuth";

const izinRoutes = express.Router();

izinRoutes.get("/", isAuth, izinController.getAll);

izinRoutes.post("/", isAuth, izinController.create);

izinRoutes.get("/:id", isAuth, izinController.getById);

izinRoutes.put("/:id", isAuth, izinController.update);

izinRoutes.delete("/:id", isAuth, izinController.delete);

izinRoutes.get("/:id", isAuth, izinController.getById);

export default izinRoutes;
