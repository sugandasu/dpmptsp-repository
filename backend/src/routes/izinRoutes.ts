import express from "express";

export const izinRoutes = express.Router();

izinRoutes.get("/", (_, res) => {
  res.send("Hello world! Izin!");
});
