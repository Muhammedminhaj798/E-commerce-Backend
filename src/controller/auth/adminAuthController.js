import jwt from "jsonwebtoken"
import { joiUserLogin } from "../../utils/validation.js"
import customError from "../../utils/customErr.js"
import User from "../../model/userSchema.js"
import bcrypt from "bcryptjs"


const createToken = (id, isAdmin) => {
    return jwt.sign({id, isAdmin}, process.env.JWT_TOKEN, {
        expiresIn: "14d"
    })
}

const adminLogin = async(req,res,next) => {
    const {value, error} = joiUserLogin.validate(req.body);
    if (error){
        return res.status(200).json({
            message:error.details[0].message,
            status: "Failed",
        })
    }

    const {email, password} = value;

    const adminData = await User.findOne({ email })
    if(!adminData){
        return next(new customError("Admin not found"))
    }
    if(adminData.isBlocked){
        return next(new customError("Admin has blocked"))
    }
    if(!adminData.isAdmin){
        return next(new customError("access denied please use another email, this email already taken", 403))
    }
    const isMatch = await bcrypt.compare(password, adminData.password);
    if(!isMatch){
        return next(new customError("your password is incorrect",400));
    }
    const token = createToken(adminData._id, adminData.isAdmin)

    res.cookie("token", token, {
        httpOnly:true,
        secure:true,
        sameSite:"lax",
        maxAge: 7 * 24 * 60 * 1000,
    })

    res.status(200).json({
        message: "user logged in successfully",
        isAdmin : adminData.isAdmin,
        token,
        data:adminData,
    })
}

export default adminLogin