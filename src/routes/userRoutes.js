import express from "express";
import tryCatch from "../middleware/tryCatch.js";
import { getAllProduct, getProductById, getProductType } from "../controller/user/userProductController.js";
import { getUSerCart, removeFromCart, updateUserCart } from "../controller/user/UserCartController.js";
import verifyToken from "../middleware/authentication.js";
import { addToWishlist, getUserWishlist, removeFromWishlist } from "../controller/user/userWishlistController.js";
import { cancelOneOrder, getAllOrders, getOneOrder } from "../controller/user/userOrderController.js";

const router = express.Router();
//get all products/type/id
router.get("/getAllProducts",tryCatch(getAllProduct))
.get("/getProductType/:type",tryCatch(getProductType))
.get("/getProductById/:id",tryCatch(getProductById))
//cart routes
.get("/getUserCart",verifyToken,tryCatch(getUSerCart))
.post("/updateUserCart",verifyToken,tryCatch(updateUserCart))
.delete("/removeFromCart",verifyToken,tryCatch(removeFromCart))
//wishlist routes
.get("/getUserWishlist",verifyToken,tryCatch(getUserWishlist))
.post("/addToWishlist",verifyToken,tryCatch(addToWishlist))
.delete("/removeFromWishlist",verifyToken,tryCatch(removeFromWishlist))
//order routes
.get("/getAllOrders",verifyToken,tryCatch(getAllOrders))
.get("/getOneOrder/:id",verifyToken,tryCatch(getOneOrder))
.patch("/cancelOneOrder/:id",verifyToken,tryCatch(cancelOneOrder))

export default router;