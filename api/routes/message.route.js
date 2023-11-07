import express  from "express";
import { verifyToken } from "../middleware/jwt.js";
import {getMessage,createMessage} from '../controllers/message.controller.js'
const router = express.Router()

router.get('/:id',verifyToken,getMessage)
router.post('/',verifyToken,createMessage)


export default router