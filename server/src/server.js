import express from 'express'
const app =express()
import cors from 'cors'
import userRouter from './routes/user.routes.js'
import {config} from "dotenv"
import { connectDb } from './config/db.js'
config({
    path:'./.env'
})


const PORT=process.env.PORT  || 3000


connectDb(process.env.MONGO_URI)

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}))



app.get("/api/v1/health",(req,res)=>{
    console.log("i am healthy")
    res.send("hello world i am healthy ")
})
app.use("/api/v1/users",userRouter)

app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
})