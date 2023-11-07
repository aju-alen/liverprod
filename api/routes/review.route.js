import express  from "express";
import { verifyToken } from "../middleware/jwt.js";
import {getReviewById,postReviewById,deleteReview} from '../controllers/review.controller.js'
const router = express.Router()


router.get('/:id',verifyToken,getReviewById)
router.post('/:id',verifyToken,postReviewById)
router.delete('/:id',verifyToken,deleteReview)


export default router