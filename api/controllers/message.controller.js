import Message from '../models/message.model.js'
import Conversation from '../models/conversation.model.js'


export const createMessage = async (req, res, next) => {
    const newMessage = new Message({
        conversationId: req.body.conversationId,
        userId: req.userId,
        desc: req.body.desc
    })
    try {
        const saveMessage = await newMessage.save()
        await Conversation.findOneAndUpdate({ id: req.body.conversationId },
            {
                $set: {
                    readBySeller: req.isSeller,
                    readByBuyer: !req.isSeller,
                    lastMessage: req.body.desc
                }
            },
            { new: true }
        )
        res.send(saveMessage)
    }
    catch (err) {
        next(err)
    }
}

export const getMessage = async (req, res, next) => {
    try {
        const messages = await Message.find({ conversationId: req.params.id })
        res.send(messages)

    }
    catch (err) {
        next(err)
    }
}