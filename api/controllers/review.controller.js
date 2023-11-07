import Reviews from '../models/review.model.js'
import Gig from '../models/gig.model.js'

export const getReviewById = async (req, res, next) => {
    try {
        const data = await Reviews.find({gigId:req.params.id})
        res.status(200).json(data)
    }
    catch (err) {
        next(err)
    }
}
export const postReviewById = async (req, res, next) => {
    try {
        if(req.isSeller){
            return res.status(400).send('sellers cannot review products')
        }
        const duplicate = await Reviews.findOne({gigId:req.params.id,userId:req.userId})
        if(duplicate){
            return res.status(400).send('You can only review once')

        }
        const postReview = new Reviews({
            ...req.body,
            userId: req.userId,
            gigId: req.params.id
        })
        const review = await postReview.save()
        await Gig.findByIdAndUpdate(req.body.gigId,{$inc:{totalStars:req.body.star,starNumber:1}})
        res.status(200).json({message:"Review Created",review})
    }
    catch (err) {
        next(err)
    }
}
export const deleteReview = async (req, res, next) => {
    try {
        const data = await Reviews.findOne({_id:req.params.id})
        if(!data){
            return res.status(400).send('no review exist ') 
        }
        if (req.userId !== data.userId.toString()){
            return res.status(400).send('you cannot delete this as youre not the author  ') 

        }
        const deleted = await Reviews.findByIdAndDelete(data._id)
        res.status(200).json(deleted)
    }
    catch (err) {
        next(err)
    }
}