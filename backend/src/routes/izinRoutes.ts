import express from "express";
import izinController from "../controllers/izinController";
import authenticated from "../middlewares/Authenticated";

const izinRoutes = express.Router();

izinRoutes.get("/", authenticated, izinController.getAll);

izinRoutes.post("/", authenticated, izinController.create);

izinRoutes.get("/:id", authenticated, izinController.getById);

izinRoutes.put("/:id", authenticated, izinController.update);

izinRoutes.delete("/:id", authenticated, izinController.delete);

export default izinRoutes;
