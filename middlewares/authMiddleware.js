const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

module.exports.protect = asyncHandler(async(req, res, next)=>{

    try{
        const token = req.cookies.token

        if(!token)
        {   
            res.status(400)
            throw new Error('Need to login again')
        }
        //Verify the token
        const verified = await jwt.verify(token, process.env.JWT_SECRET)
        //Add user data to request object
        const user = await User.findById(verified.id).select("-password")
        if(!user){
            res.status(400)
            throw new Error('User not found')
        }

        req.user = user
        next()

    }catch(err)
    {
        res.status(401)
        throw new Error('Not able to verify token, login again')
    }
})

module.exports.adminOnly = (req, res, next)=>{
    if(req.user && req.user.role === 'admin'){
        next()
    }else{
        res.status(401)
        throw new Error('Not authorized as an admin')
    }
}