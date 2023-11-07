import Gig from '../models/gig.model.js'
import Order from '../models/order.model.js'
import Stripe from 'stripe'
import dotenv from 'dotenv'
dotenv.config()

export const intent = async (req, res, next) => {
    const stripe = new Stripe(process.env.STRIPE_SK_KEY)

    const gig = await Gig.findById(req.params.id)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: gig.price * 100,
        currency: "aed",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
            enabled: true,
        },
    });

    const newOrder = new Order({
        gigId: gig._id.toString(),
        img: gig.cover,
        title: gig.title,
        buyerId: req.userId,
        sellerId: gig.userId,
        price: gig.price,
        payment_intent: paymentIntent.id
    })
    await newOrder.save()

    res.send({clientSecret:paymentIntent.client_secret})

}


export const getOrder = async (req, res, next) => {
    try {
        const orders = await Order.find({
            ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }), isCompleted: true
        })
        res.send(orders)

    } catch (err) {
        next(err)
    }
}
export const confirm = async (req, res, next) => {
    try {
        const orders = await Order.findOneAndUpdate({payment_intent:req.body.payment_intent},{
            $set:{
                isCompleted:true
            }
        })
        res.send('orders confirmed')

    } catch (err) {
        next(err)
    }
}




// export const createOrder = async (req, res, next) => {
//     try {
//         const gig = await Gig.findById(req.params.gigId)

//         const newOrder = new Order({
//             gigId: gig._id.toString(),
//             img: gig.cover,
//             title: gig.title,
//             buyerId: req.userId,
//             sellerId: gig.userId,
//             price: gig.price,
//             payment_intent: "temp"
//         })
//         await newOrder.save()
//         res.send('Order created')

//     } catch (err) {
//         next(err)
//     }
// }

