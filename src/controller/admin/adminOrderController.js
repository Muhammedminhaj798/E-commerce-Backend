import orderSchema from "../../model/orderSchema.js";
import customError from "../../utils/customErr.js";

const getAdmiOrderDetails = async(req,res,next) =>{
    const orderDetails = await orderSchema.find()
    if(!orderDetails){
        return next(new customError("not order found", 404))
    }
    res.status(200).json({
        message:"order find success fully",
        status:"success",
        data:orderDetails
    })


}

export {getAdmiOrderDetails}
