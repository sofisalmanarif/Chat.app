import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";


export const isLoggedin =async (req,res,next)=>{
    let  token ;
    // console.log("hitted")
    // console.log(req.headers.authorization)
    if(!req.headers.authorization){
        return res.status(401).json({success:false,msg:"login First"})
    }
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1]
            // console.log(token)
            // if(!token){
            //     return res.status(401).json({success:false,msg:"login First"})
            // }
            const decoded = jwt.verify(token,"hdsggjg")
            if(!decoded){
                return res.status(401).json({success:false,msg:"invalid auth token"})
            }
            // console.log(decoded)
            const user = await User.findById({_id:decoded._id}).select("-password")
            console.log(user)
            
            req.user = user
            next()

        } catch (error) {
            
        }
    }
}


