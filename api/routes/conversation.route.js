import express  from "express";
import { verifyToken } from "../middleware/jwt.js";
import {getConversations,createConversations,getSingleConversations,updateConversations} from '../controllers/conversation.controller.js'
const router = express.Router()

router.get('/',verifyToken,getConversations)
router.post('/',verifyToken,createConversations)
router.get('/single/:id',verifyToken,getSingleConversations)
router.put('/:id',verifyToken,updateConversations)


export default router