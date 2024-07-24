import express from 'express'
import { login, register, searchUser } from '../controllers/user.controllers.js'
import { isLoggedin } from '../middlewares/isAuthenticated.js'

const router =express.Router()
router.post("/register",register)
router.post("/login",login)
router.get("/search",isLoggedin,searchUser)
export default router