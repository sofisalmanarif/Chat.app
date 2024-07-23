import mongoose from "mongoose"

export const connectDb = async(url)=>{
   try {
    await mongoose.connect(url)
   console.log("connected to db")
   } catch (error) {
    console.log(error.message)
    
   }
}