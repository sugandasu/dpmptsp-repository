import express from "express";
import authController from "../controllers/authController";
import authenticated from "../middlewares/Authenticated";

const authRoutes = express.Router();

authRoutes.post("/register", authController.register);

authRoutes.post("/login", authController.login);

authRoutes.post("/logout", authenticated, authController.logout);

authRoutes.get("/me", authenticated, authController.me);

authRoutes.post("/refresh_token", authController.refreshToken);

export default authRoutes;
