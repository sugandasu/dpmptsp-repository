import express from "express";
import authController from "../controllers/authController";
import authenticated from "../middlewares/Authenticated";

const authRoutes = express.Router();

authRoutes.post("/register", authController.register);

authRoutes.post("/login", authController.login);

authRoutes.post("/logout", authenticated, authController.logout);

authRoutes.get("/me", authenticated, authController.me);

authRoutes.post("/refresh-token", authController.refreshToken);

authRoutes.get("/api-token", authenticated, authController.getApiToken);

authRoutes.post(
  "/refresh-api-token",
  authenticated,
  authController.refreshApiToken
);

authRoutes.post(
  "/revoke-api-token",
  authenticated,
  authController.revokeApiToken
);

export default authRoutes;
