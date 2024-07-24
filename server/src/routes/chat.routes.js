import express from 'express'
import { isLoggedin } from '../middlewares/isAuthenticated.js'
import { accessChat, addMember, createAGroup, fetchChats, removeMember, renameGroup } from '../controllers/chat.controllers.js'

const router =express.Router()
router.post("/",isLoggedin,accessChat)
router.get("/",isLoggedin,fetchChats)
router.post("/createagroup",isLoggedin,createAGroup)
router.put("/renamegroup",isLoggedin,renameGroup)
router.put("/addmember",isLoggedin,addMember)
router.put("/removemember",isLoggedin,removeMember)


export default router