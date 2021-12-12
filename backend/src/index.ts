import cookieParser from "cookie-parser";
import cors from "cors";
import * as dotenvsafe from "dotenv-safe";
import express from "express";
import path from "path";
import { createConnection } from "typeorm";
import { __prod__ } from "./constants";
import Izin from "./entities/Izin";
import User from "./entities/User";
import authRoutes from "./routes/authRoutes";
import bapendaRoutes from "./routes/bapendaRoutes";
import indexRoutes from "./routes/indexRoutes";
import izinRoutes from "./routes/izinRoutes";
import kendaraanRoutes from "./routes/kendaraanRoutes";
import profileRoutes from "./routes/profileRoutes";

dotenvsafe.config({
  allowEmptyValues: true,
});

const main = async () => {
  const conection = await createConnection({
    type: "mysql",
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: !__prod__,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [User, Izin],
  });

  if (__prod__) {
    await conection.runMigrations();
  }

  const app = express();
  app.use(cors({ origin: process.env.DOMAIN_NAME, credentials: true }));
  if (__prod__) {
    app.set("trust proxy", 1);
  }
  app.use(express.json());
  app.use(cookieParser());

  app.get("/", (_, res) => {
    res.send("Hello world!");
  });

  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/izins", izinRoutes);
  app.use("/api/v1/kendaraans", kendaraanRoutes);
  app.use("/api/v1/profile", profileRoutes);
  app.use("/api/v1/bapenda", bapendaRoutes);
  app.use("/api/v1/index", indexRoutes);

  app.listen(process.env.PORT, () => {
    console.log(`Backend is listening on ${process.env.BACKEND_URL}`);
  });
};

main().catch((err) => {
  console.log(err);
});
