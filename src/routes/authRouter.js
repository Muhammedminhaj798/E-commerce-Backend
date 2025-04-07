import express from "express";
import tryCatch from "../middleware/tryCatch.js";
import { home, UserLogin, userLogout, UserReg } from "../controller/auth/authController.js";
import verifyToken from "../middleware/authentication.js";


const authRouter = express.Router();

authRouter
   .post("/register",tryCatch(UserReg))
   .post("/login",tryCatch(UserLogin))
   .delete("/logout",tryCatch(userLogout))
   .get('/home',verifyToken, tryCatch(home))
export default authRouter;