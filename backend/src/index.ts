import "dotenv-safe/config";
import express from "express";
import { createConnection } from "typeorm";
import { __prod__ } from "./constants";
import { User } from "./entities/User";
import { izinRoutes } from "./routes/izinRoutes";
import path from "path";
import { authRoutes } from "./routes/authRoutes";
import cors from "cors";
import { Izin } from "./entities/Izin";

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
  app.use(express.json());
  app.use(cors({ origin: process.env.DOMAIN_NAME, credentials: true }));

  app.get("/", (_, res) => {
    res.send("Hello world!");
  });

  app.use("/api/v1/izins", izinRoutes);
  app.use("/api/v1/auth", authRoutes);

  app.listen(process.env.PORT, () => {
    console.log(`Backend is listening on ${process.env.BACKEND_URL}`);
  });
};

main().catch((err) => {
  console.log(err);
});
