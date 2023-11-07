import  jsonWebToken  from 'jsonwebtoken'
import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import createError from '../utils/createError.js'
export const register = async (req, res, next) => {
    console.log(req.body);
    try {
        const hash = await bcrypt.hashSync(req.body.password, 5)
        
        const newUser = new User({
            ...req.body,
            password: hash
        })
        const obj = await newUser.save()
        res.status(201).json({ message: 'user created', obj })
    } catch (err) {
        next(err)
    }
}

export const login = async (req, res,next) => {
    try {
        let user = await User.findOne({ username: req.body.username })
        if (!user) {
            return next(createError(404,'User not found'))
        }
        let isCorrect = bcrypt.compareSync(req.body.password, user.password)
        if (!isCorrect) {
            return res.send('Wrong password or username')
        }

        const token = jwt.sign({
            id:user._id,
            isSeller:user.isSeller
        },process.env.SECRET)

        const { password, ...info } = user._doc
        res.cookie("accessToken",token,{httpOnly:true,secure:true}).status(201).json(info)
    } catch (err) {
        res.status(500).json({ error: "error occoured" })
    }

}
export const logout = async (req, res) => {
res.clearCookie("accessToken",{sameSite:'none',secure:true}).status(200).json({message:"User logged out"})
}