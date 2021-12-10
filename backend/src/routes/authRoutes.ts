import express from "express";
import authController from "../controllers/authController";
import isAuth from "../middlewares/isAuth";

const authRoutes = express.Router();

authRoutes.get("/me", isAuth, authController.me);

authRoutes.post("/register", authController.register);

authRoutes.post("/login", authController.login);

authRoutes.post("/logout", isAuth, authController.logout);

authRoutes.post("/refresh-token", authController.refreshToken);

export default authRoutes;
