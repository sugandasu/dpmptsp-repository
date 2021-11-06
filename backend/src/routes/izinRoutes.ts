import express from "express";

const izinRoutes = express.Router();

izinRoutes.get("/", (_, res) => {
  res.send("Hello world! Izin!");
});

export default izinRoutes;
