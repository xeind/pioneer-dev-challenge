import express, { NextFunction, Request, Response } from "express";
import usersRouter from "./routes/users";

// const express = require("express");
const app = express();

app.use("/api/users", usersRouter);

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello Guys!");
});

app.get("/api/users/", (req: Request, res: Response, next: NextFunction) => {
  res.send(["Hello"]);
});

app.listen(PORT, () => {
  console.log(`Application listening to port: ${PORT}`);
});
