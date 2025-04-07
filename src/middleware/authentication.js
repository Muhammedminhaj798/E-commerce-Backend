import jwt from "jsonwebtoken";
import customError from "../utils/customErr.js";

const verifyToken = (req, res, next) => {
    try {
        console.log("request",req);
        
        const token =req.cookies.token;
        console.log(token);
        
        if(!token) {
            return next(new customError("You are not authenticated", 403));
        }
        jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
            if (err) {
                return next(new customError("Token is not valid", 403));
            }
            req.user = user;
            next();
        });
    }catch (err) {
        return next(new customError("You are not authenticated", 401));
    }
}

export default verifyToken;