import express from 'express'
import { user } from '../controllers/user.controllers.js'

const router =express.Router()
router.get("/my",user)
export default router