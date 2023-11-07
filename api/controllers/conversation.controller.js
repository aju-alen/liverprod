import conversationModel from "../models/conversation.model.js"
import createError from "../utils/createError.js"

export const getConversations = async (req,res,next)=>{
   const conversations = await conversationModel.find(req.isSeller? {sellerId:req.userId}:{buyerId:req.userId}).sort({updatedAt:-1})
    try{
        res.send(conversations)
    }
    catch(err){
        next(err)
    }
}
export const createConversations =async (req,res,next)=>{
    const newConversation = new conversationModel({
        id:req.isSeller ? req.userId + req.body.to : req.body.to + req.userId ,
        sellerId: req.isSeller ? req.userId : req.body.to,
        buyerId: req.isSeller ? req.body.to  : req.userId,
        readByBuyer: !req.isSeller ,
        readBySeller: req.isSeller 

    })
    try{
        const savedConversation = await newConversation.save()
        res.status(201).send(savedConversation)
    }
    catch(err){
        next(err)
    }
}
export const getSingleConversations = async (req,res,next)=>{
    try{
        const conversation = await conversationModel.findOne({id:req.params.id})
        if(!conversation) return next(createError(404,"Error,not found"))
        res.send(conversation)
    }
    catch(err){
        next(err)
    }
}
export const updateConversations = async (req,res,next)=>{
    try{
        const updateConversations = await conversationModel.findOneAndUpdate({id:req.params.id},{
            $set:{
                readBySeller:true,
                readByBuyer:true
            }
        },
        {new:true}
        )
        res.send(updateConversations)
    }
    catch(err){
        next(err)
    }
}