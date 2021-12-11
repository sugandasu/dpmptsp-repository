import express from "express";
import indexController from "../controllers/indexController";

const indexRoutes = express.Router();

indexRoutes.get("/", indexController.get);

export default indexRoutes;
