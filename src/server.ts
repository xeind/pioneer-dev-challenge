import express, { NextFunction, Request, Response } from "express";
import usersRouter from "./routes/users";
import executeRouter from "./routes/execute";
import { parse } from "dotenv";

// const express = require("express");
const app = express();

// TEST
app.use("/api/users", usersRouter);

// ROUTER for EXECUTE
app.use("/api", executeRouter);

const PORT = process.env.PORT || 3000;

// TEST
const mockProducts = [
  { id: 1, productName: "Chicken Breast", price: 200 },
  { id: 2, productName: "Repolyo", price: 40 },
  { id: 3, productName: "Ginger", price: 7 },
];

app.get("/", (req, res) => {
  res.send("Hello Guys!");
});

app.get("/api/products", (req: Request, res: Response, next: NextFunction) => {
  console.log(req.query);
  res.send(mockProducts);

  if (req.query.code !== "pioneerdevai") return res.status(401);
});

app.get("/api/products/:id", (req: Request, res: Response) => {
  console.log(req.params);
  const parsedId = parseInt(req.params.id);

  if (!parsedId) return res.status(404).send({ msg: "Not found" });

  const findProduct = mockProducts.find((product) => product.id === parsedId);

  if (!findProduct) return res.status(404);

  res.send(findProduct);
});

// code
app.get("/api/", (req: Request, res: Response) => {
  const { message, code } = req.query;

  res.json({ message });

  console.log(req.params);
});

app.listen(PORT, () => {
  console.log(`Application listening to port: ${PORT}`);
});
