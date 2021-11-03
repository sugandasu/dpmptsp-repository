import express from "express";

const main = async () => {
  const app = express();
  app.get("/", (req, res) => {
    res.send("Hello world!");
  });

  app.listen(3000, () => {
    console.log("Backend is listening to port 3000");
  });
};

main().catch((err) => {
  console.log(err);
});
