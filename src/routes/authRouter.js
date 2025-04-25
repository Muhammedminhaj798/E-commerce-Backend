import express from "express";
import tryCatch from "../middleware/tryCatch.js";
import { home, UserLogin, userLogout, UserReg } from "../controller/auth/authController.js";
import { user_auth } from "../middleware/authentication.js";
import adminLogin from "../controller/auth/adminAuthController.js";

const authRouter = express.Router();

authRouter
//userAuthRoutes
   .post("/register",tryCatch(UserReg))
   .post("/login",tryCatch(UserLogin))
   .delete("/logout",tryCatch(userLogout))
   .get('/home',user_auth, tryCatch(home))
//adminAuthRoutes
   .post("/adminLogin",tryCatch(adminLogin))
export default authRouter;