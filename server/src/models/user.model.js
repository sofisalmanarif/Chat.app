import mongoose from "mongoose"

const user = mongoose.Schema({
    userName: {
        type:String,
        
        required:true,}
        ,
    email: {
        type:String,
        unique:true,
        required:true,},
    password: {
        type:String,
        required:true},
    pic:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/"
    }
    
})