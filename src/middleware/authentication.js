import jwt from "jsonwebtoken";
import customError from "../utils/customErr.js";

// const verifyToken = (req, res, next) => {
//     try {
        
//         const token = req.cookies.token;
        
//         if(!token) {
//             return next(new customError("You are not authenticated", 403));
//         }
//         jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
//             if (err) {
//                 return next(new customError("Token is not valid", 403));
//             }
//             req.user = user;
//             next();
//         });
//     }catch (err) {
//         return next(new customError("You are not authenticated", 401));
//     }
// }

// export default verifyToken;

export const user_auth = (req, res, next) => {
   
    // const authHeader = req.headers['authorization'];
    const token = req.cookies.token

    if (!token) {
       
        const refreshmentToken = req.cookies?.refreshToken;
        
        if (!refreshmentToken) {
            return next(new customError('No access or refreshment token provided',400))
        }

        const decoded = jwt.verify(refreshmentToken, process.env.JWT_TOKEN);
        
            const newToken = jwt.sign(
            { id: decoded.id, username: decoded.username, email: decoded.email },
            process.env.JWT_TOKEN,
            { expiresIn: "1m" }
        );

         res.cookie('token', newToken, {
            httpOnly: true,
            secure: true, 
            maxAge: 1 * 60 * 1000,
            sameSite: 'none'
        });

        req.user = decoded;
        return next();
    } else {
        
        try {
            const decoded = jwt.verify(token, process.env.JWT_TOKEN);
           
            req.user = decoded;
            return next();
        } catch (error) {
            const refreshmentToken=req.cookies?.refreshToken
            if (!refreshmentToken){
                return next(new customError('No access or refreshment token provided',400))
            }
            const decoded=jwt.verify(refreshmentToken,process.env.JWT_TOKEN)
            const newToken = jwt.sign(
                { id: decoded.id, username: decoded.username, email: decoded.email },
                process.env.JWT_TOKEN,
                { expiresIn: "1m" }
            );
    
           
            res.cookie('token', newToken, {
                httpOnly: true,
                secure: true, 
                maxAge: 1 * 60 * 1000, 
                sameSite: 'none'
            });
    
            req.user = decoded;
            res.json("access denied")
            return next();
        }
       

    }


};


