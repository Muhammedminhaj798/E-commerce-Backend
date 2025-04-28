import User from '../../model/userSchema.js'
import customError from '../../utils/customErr.js';
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import { joiUserSchema } from '../../utils/validation.js';
import { joiUserLogin } from '../../utils/validation.js';

const createToken = (id, isAdmin) => {
    return jwt.sign({ id, isAdmin }, process.env.JWT_TOKEN, {
        expiresIn: "1d",
    });
};

// const createRefreshToken = (id, isAdmin) => {
//     return jwt.sign({ id,isAdmin  }, process.env.JWT_REFRESH_TOKEN, {
//         expiresIn: "14d",
//     });
// };
export const UserReg = async (req, res, next) => {
   const {value, error} = joiUserSchema.validate(req.body);
   
   if (error) {
    return next(new customError(error.details[0].message, 400));
   }

   const { name, email, password} = value;
   const existUser = await User.findOne({ email });
   if (existUser) {
    return next(new customError("User already exist", 400));
   }

   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);
   const newUser = new User({
    name,
    email,
    password: hashedPassword, 
   });
   await newUser.save();

   res.status(200).json({
    message: "User registered successfully",
    status: "success",
   })
}

const UserLogin = async (req, res, next) => {
    const {value, error} = joiUserLogin.validate(req.body); 
    if (error) {
        return res.status(400).json({
            message: error.details[0].message,
            status: "failed",
        });
    }
    const { email, password } = value;

    const userData = await User.findOne({ email });
    if (!userData) {
        return next(new customError("invalid credential", 400));
    }
    if(userData.isBlocked){
        return next(new customError("user is blocked", 400)); 
    }

    if(userData.isAdmin){
        return next(new customError("access denied please use another email, this email already taken", 403));
    }

    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) {
        return next(new customError("invalid credential", 400));
    }
    const token = createToken(userData._id, userData.isAdmin);

    res.cookie("token", token, {
       httpOnly: true,
       secure: true,
       sameSite: "lax",
       maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    
    // res.cookie("refreshToken", refreshToken, {
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: "lax",
    //     maxAge: 7 * 24 * 60 * 60 * 1000,
    //  })

    res.status(200).json({
        message: "User logged in successfully",
        isAdmin: userData.isAdmin,
        token,
        // refreshToken,
        data: userData,
    });
    
}


const userLogout = async (req, res, next) => {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    })

    res.status(200).json({
        message: "User logged out successfully",
        status: "success",
    });
}

const home = async (req, res, next) => {
    res.status(200).json({
        message: "User home page",
        status: "success",
    }); 
}


export {  UserLogin, userLogout,home };