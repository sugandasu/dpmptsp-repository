import "dotenv-safe/config";
import express from "express";
import izinRoutes from "./routes/izin";

const main = async () => {
  const app = express();
  app.get("/", (_, res) => {
    res.send("Hello world!");
  });

  app.use("/api/v1/izins", izinRoutes);

  app.listen(process.env.PORT, () => {
    console.log(`Backend is listening on ${process.env.BACKEND_URL}`);
  });
};

main().catch((err) => {
  console.log(err);
});
