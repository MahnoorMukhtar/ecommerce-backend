const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const jwt  = require('jsonwebtoken')
const bcrypt = require("bcrypt") 


const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"})
}

const tokenParameters = {
    path: '/',
    expires: new Date(Date.now() + 1000 * 86400),
    httpOnly: true,
    // secure: true,
    // sameSite: 'none'
}

module.exports.registerUser = asyncHandler(async(req, res, next)=>{

    const {name, email, password} = req.body

    if(!name || !email || !password )
    {
        res.status(400)
        throw new Error("Please fill in all the fields")
    }
    console.log("pass length", password < 6)

    if(password.length < 6)
    {
        res.status(400)
        throw new Error("Password should be at least 6 characters long")
    }

    const user =await User.findOne({email: email})

    if(user)
    {
        res.status(400)
        throw new Error("User with this email already exists")
    }

    const newUser = await User.create({
        name,
        password,
        email
    })

    const token = generateToken(newUser._id)

    if(newUser)
    {
        const {_id, name, email, role} = newUser

        res.cookie("token", token, tokenParameters )

        res.status(201).json({
            msg: "User created sucessfully",
            _id, 
            name,
            email,
            token,
            role
        })
    }
    else{
        res.status(400)
        throw new Error("invalid user data")
    }

})


module.exports.loginUser = asyncHandler(async(req,res,next)=>{
    const { email, password } = req.body

    if(!email || !password){
        res.status(400)
        throw new Error('Please provide valid data')
    }

    const user = await User.findOne({email})
    if(!user){
        res.status(400)
        throw new Error('Invalid credentials')
    }

    console.log("password", password)

    const isPassword = await bcrypt.compare(password, user.password)
    console.log("password", isPassword)

    if(user && isPassword)
    {
        const token = generateToken(user._id)
        const {_id, name, role, email} = user

        res.cookie("token", token, tokenParameters)

        res.status(200).json({
            msg: "User successfully login",
            _id, name, email, token, role
        })
    }else{
        res.status(400)
        throw new Error( 'Invalid credentials')
    }
})

module.exports.logout = asyncHandler(async(req, res, next)=>{
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({msg:"Logged out Successfully"})
})


module.exports.getUser = asyncHandler(async(req, res, next)=>{

    const user = req.user
    const userExists = await User.findById(user._id).select("-password")

    if(userExists)
    {
        res.status(200)
        res.json(userExists)
    }
    else{
        res.status(400)
        throw new Error('User does not exists')
    }

})

module.exports.getLoginStatus = asyncHandler(async(req, res, next)=>{
    const token = req.cookies.token

    if(!token)
    {
        return res.json(false)
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET)
    if (!verified)
    {
        res.json(false)
    }
    else{
        res.json(true)
    }
})


module.exports.updateUser = asyncHandler(async(req, res, next)=>{
    const user = await User.findById(req.user._id).select("-password")
    
    if(user)
    {
        const { name, phone, address } = user

        user.name = req.body.name || name;
        user.phone = req.body.phone || phone;
        user.address = req.body.address || address;

        const updatedUser = await user.save()
        res.status(200).json(updatedUser)
    }
    else{
        res.status(400)
        throw new Error('No user with this id!')
    }
})

module.exports.updateUserPhoto = asyncHandler(async(req, res, next)=>{

    const user = await User.findById(req.user._id).select('-password')
    user.photo = req.body.photo
    console.log(req.body)
    const updatesUser = await user.save()
    console.log(updatesUser)
    res.status(200).json(updatesUser)

})