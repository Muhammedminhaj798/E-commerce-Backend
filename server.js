import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("hello");
});
mongoose
  .connect(process.env.MONGOOSE)
  .then(() => console.log("connected to mongoose"))
  .catch((err)=>console.error(err))

app.listen(3000, () => {
  console.log("server is running");
});
