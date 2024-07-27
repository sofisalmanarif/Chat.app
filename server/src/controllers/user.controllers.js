import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
console.log(User)
export const register = async(req,res)=>{
    try {
        const {email,userName,password}= req.body

        if(!email || !userName || !password){
            return res.
                status(400).
                json({error:"Please fill all the fields"})
        }

        let user = await User.findOne({email:email})
        if(user){
            return res.
                status(400).
                json({error:"User already exists"})

        }

        const  salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        user = await User.create({
            userName,
            email,
            password:hashedPassword,
        })
        const token = jwt.sign({_id:user._id,},"hdsggjg")
        return res.
            status(201).
            json({success:true,msg:`welcome ${user.userName} `,token})

    } catch (error) {
        console.log(error)
        
    }
}


export const login = async(req,res)=>{
    try {
        console.log(req.body)
    const {email,password}= req.body
    if(!email  || !password){
        return res.status(400).json({error:"Please fill all the fields"})
    }

    let user = await User.findOne({email:email})
        if(!user){
            return res.status(400).json({
                success:false,
                msg:"invalid Credential"
            })
        }

    const matched = bcrypt.compareSync(password, user.password);
    if(!matched){
        return res.status(400).json({
            success:false,
            msg:"invalid Credential"
        })
    }
    console.log("mathched",matched)
    
    const token = jwt.sign({_id:user._id,},"hdsggjg")
    // console.log(token)
    return res.
        status(201).
        json({success:true,msg:"login Successfully ",token,user})
    
} catch (error) {
        console.log(error)
        
    }
}

export const searchUser =async(req,res)=>{
    const keyword  =  req.query.search 
    ? {
        $or:[
            {usrName:{ $regex: req.query.search, $options: "i" }},
            {email:{ $regex: req.query.search, $options: "i" }},
        ]
    }
    :{}

    console.log(keyword)
   const users = await User.find(keyword).select("-password").find({_id:{$ne :req.user._id}})
   if(!users) return res.status(404),json({success:false,msg:"user not found"})

    res.status(200).json({success:true,users})

}