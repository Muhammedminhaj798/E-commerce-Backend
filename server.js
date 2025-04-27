// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import authRouter from "./src/routes/authRouter.js";
// import cookieParser from "cookie-parser";
// import userRoutes from "./src/routes/userRoutes.js";
// import manageError from "./src/middleware/mangeError.js";
// import adminRouter from "./src/routes/adminRoutes.js";

// dotenv.config();

// const app = express();

// app.use(express.json());
// app.use(cookieParser());


// app.get("/", (req, res) => {
//   res.send("hello");
// });


// app.use("/api/auth", authRouter);
// app.use("/api/user", userRoutes);
// app.use("/api/admin", adminRouter);
// app.use(manageError)
// mongoose
//   .connect(process.env.MONGOOSE)
//   .then(() => console.log(" Connected to MongoDB"))
//   .catch((err) => console.error(" MongoDB connection error:", err));

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(` Server running on port ${PORT}`);
// });


import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./src/routes/authRouter.js";
import cookieParser from "cookie-parser";
import userRoutes from "./src/routes/userRoutes.js";
import manageError from "./src/middleware/mangeError.js";
import adminRouter from "./src/routes/adminRoutes.js";
import cors from 'cors'; // <-- added

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

// Add CORS middleware here
app.use(cors({
  origin: "http://localhost:3001",
  credentials: true,
}));

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRouter);
app.use(manageError);

mongoose
  .connect(process.env.MONGOOSE)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
