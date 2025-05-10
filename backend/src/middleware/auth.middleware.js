import jwt from "jsonwebtoken";
import user from "../models/User.js";

export const checkRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({message:"Unauthorised token"})
        }
        const decode = jwt.verify(token,process.env.jwt_secret);
        
        if(!decode){
            return res.status(401).json({message:"token invalid"});
        }
        const decodedUser = await user.findById(decode.userId).select("-password");
        
        if(!decodedUser){
            return res.status(401).json({message:"No user found"});
        }
        req.user = decodedUser;
        next();

    } catch (error) {
        console.log("Error at check route", error)
    }
}