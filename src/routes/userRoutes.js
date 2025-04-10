import express from "express";
import tryCatch from "../middleware/tryCatch.js";
import { getAllProduct, getProductById, getProductType } from "../controller/user/userProductController.js";
import { getUSerCart, removeFromCart, updateUserCart } from "../controller/user/UserCartController.js";
import verifyToken from "../middleware/authentication.js";

const router = express.Router();
//get all products/type/id
router.get("/getAllProducts",tryCatch(getAllProduct))
.get("/getProductType/:type",tryCatch(getProductType))
.get("/getProductById/:id",tryCatch(getProductById))
//cart routes
.get("/getUserCart",verifyToken,tryCatch(getUSerCart))
.post("/updateUserCart",verifyToken,tryCatch(updateUserCart))
.delete("/removeFromCart",verifyToken,tryCatch(removeFromCart))


export default router;