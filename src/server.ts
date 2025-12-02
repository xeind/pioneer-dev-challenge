import express from "express";
import executeRouter from "./routes/execute";

// const express = require("express");
const app = express();

// ROUTER for EXECUTE
app.use("/api", executeRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Application listening to port: ${PORT}`);
});
