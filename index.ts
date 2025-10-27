import express from "express";
import binanceService from "./services/binance.service.ts";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/data", async (req, res) => {
  const pair = req.query.pair;
  if (!pair) {
    throw new Error("Bad request");
  }

  const data = await binanceService.get(pair);

  res.json(data);
});

app.listen(3000);
