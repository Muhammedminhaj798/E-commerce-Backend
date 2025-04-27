import express from "express"
import tryCatch from "../middleware/tryCatch.js"
import { addProduct, deleteProduct, editProduct, getAllProducts, getProductById } from "../controller/admin/adminProductController.js"
import { viewAllUsers, viewUserById } from "../controller/admin/adminUsersController.js"
import upload from "../middleware/imageupload.js"

const adminRouter = express.Router()

adminRouter
//get allProducts/addProductd/deleteProduct/specific product/edit product
.get("/adminProduct",tryCatch(getAllProducts))
.post("/addProduct",upload.single('image'),tryCatch(addProduct))
.get("/admingetProduct/:id",tryCatch(getProductById))
.put("/productDeleted/:id",tryCatch(deleteProduct))
.put("/editProduct/:id",upload.single('image'),tryCatch(editProduct))

//view all users/get a specific user
.get("/usersList",tryCatch(viewAllUsers))
.get("/getuser/:id",tryCatch(viewUserById))


export default adminRouter