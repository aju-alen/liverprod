import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoute from './routes/user.route.js'
import conversationRoute from './routes/conversation.route.js'
import gigRoute from './routes/gig.route.js'
import messageRoute from './routes/message.route.js'
import orderRoute from './routes/order.route.js'
import reviewRoute from './routes/review.route.js'
import authRoute from './routes/auth.route.js'
import cookieParser from 'cookie-parser'
import { errorHandler } from './middleware/errorHandler.js'
import cors from 'cors'

const app = express()
dotenv.config()
mongoose.set("strictQuery",true)

const connect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('connected to mongoDB');
      } catch (err) {
        console.log(err)
      }
}
app.use(express.static('dist'))
app.use(cors({credentials:true,origin:'http://localhost:5173'}))
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRoute)
app.use('/api/users',userRoute)
app.use('/api/conversations',conversationRoute)
app.use('/api/gigs',gigRoute)
app.use('/api/messages',messageRoute)
app.use('/api/orders',orderRoute)
app.use('/api/reviews',reviewRoute)

app.use(errorHandler)
const PORT = process.env.PORT || 3001
app.listen(PORT,()=>{
    connect()
    console.log(`server listening at port ${PORT}`);
})
