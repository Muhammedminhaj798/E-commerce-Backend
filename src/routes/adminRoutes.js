import express from "express"
import tryCatch from "../middleware/tryCatch.js"
import { addProduct, deleteProduct, getAllProducts, getProductById } from "../controller/admin/adminProductController.js"
import { viewAllUsers, viewUserById } from "../controller/admin/adminUsersController.js"
import upload from "../middleware/imageupload.js"

const adminRouter = express.Router()

adminRouter
//get allProducts/addProductd/deleteProduct/specific product
.get("/adminProduct",tryCatch(getAllProducts))
.post("/addProduct",upload.single('image'),tryCatch(addProduct))
.get("/admingetProduct/:id",tryCatch(getProductById))
.put("/productDeleted/:id",tryCatch(deleteProduct))

//view all users/get a specific user
.get("/usersList",tryCatch(viewAllUsers))
.get("/getuser/:id",tryCatch(viewUserById))


export default adminRouter