import express from "express";
import profileController from "../controllers/profileController";
import isAuth from "../middlewares/isAuth";

const profileRoutes = express.Router();

profileRoutes.get("/", isAuth, profileController.getProfile);

profileRoutes.put("/", isAuth, profileController.updateProfile);

profileRoutes.get("/api-token", isAuth, profileController.getApiToken);

profileRoutes.post(
  "/refresh-api-token",
  isAuth,
  profileController.refreshApiToken
);

profileRoutes.post(
  "/revoke-api-token",
  isAuth,
  profileController.revokeApiToken
);

export default profileRoutes;
