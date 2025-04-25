import User from "../../model/userSchema.js"
import customError from "../../utils/customErr.js"

const viewAllUsers = async(req,res,next) => {
    const users = await User.find().select("name email")
    console.log("all users",users);
    
    if(!users){
        return next(new customError("users not found",404))
    }
    res.status(200).json({
        message:"User details is success",
        status:"success",
        data:users
    })
}

const viewUserById = async(req,res,next) => {
    const _id = req.params.id
    const userId = await User.findById(_id)
    res.status(200).json({
        message:"user get by id successfully",
        status:"success",
        data:userId
    })
}

export {viewAllUsers, viewUserById}