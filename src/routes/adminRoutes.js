import express from "express"
import tryCatch from "../middleware/tryCatch.js"
import getAllProducts from "../controller/admin/adminProductController.js"

const adminRouter = express.Router()

adminRouter
.get("/adminProduct",tryCatch(getAllProducts))

export default adminRouter