import express from "express";
import tryCatch from "../middleware/tryCatch.js";
import { getAllProduct, getFilterProduct, getProductById, getProductType, getSearchProduct } from "../controller/user/userProductController.js";
import { getUSerCart, incrementProduct, removeFromCart, updateUserCart } from "../controller/user/UserCartController.js";
import { user_auth } from "../middleware/authentication.js";
import { addToWishlist, getUserWishlist, removeFromWishlist } from "../controller/user/userWishlistController.js";
import { cancelOneOrder, createOrder, getAllOrders, getOneOrder, verify_order } from "../controller/user/userOrderController.js";

const router = express.Router();
//get all products/type/id/filter
router.get("/getAllProducts",tryCatch(getAllProduct))
.get("/getProductType/:type",tryCatch(getProductType))
.get("/getProductById/:id",tryCatch(getProductById))
.get('/getFilterProduct',tryCatch(getFilterProduct))
.get('/getSearchProduct', tryCatch(getSearchProduct))
//cart routes
.get("/getUserCart",user_auth,tryCatch(getUSerCart))
.post("/updateUserCart",user_auth,tryCatch(updateUserCart))
.patch("/removeFromCart/:id",user_auth,tryCatch(removeFromCart))
.patch("/incrementProduct",user_auth,tryCatch(incrementProduct))
//wishlist routes
.get("/getUserWishlist",user_auth,tryCatch(getUserWishlist))
.post("/addToWishlist",user_auth,tryCatch(addToWishlist))
.delete("/removeFromWishlist",user_auth,tryCatch(removeFromWishlist))
//order routes
.get('/getAllOrders',user_auth,tryCatch(getAllOrders))
.get('/getOneOrder/:id', user_auth,tryCatch(getOneOrder))
.put('/cancelOneOrder/:id',user_auth,tryCatch(cancelOneOrder))
.post('/createOrder',user_auth,tryCatch(createOrder))
.put('/verify_order',user_auth,tryCatch(verify_order))

export default router