import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./src/routes/authRouter.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser())

app.get("/", (req, res) => {
  res.send("hello");
});


app.use("/api/auth", authRouter);

mongoose
  .connect(process.env.MONGOOSE)
  .then(() => console.log(" Connected to MongoDB"))
  .catch((err) => console.error(" MongoDB connection error:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
