import userModel from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from "../config/config.js";

export async function registerUser(req,res) {
    const {email,password,username} = req.body;

    if(!email || !password ||!username){
        return res.status(400).json({
            message:"Please provide username,password and email"
        })
    }

    const isUserAlreadyExists = await userModel.findOne({
        $or:[{username}, {email}]
    })

    if(isUserAlreadyExists){
        return res.status(400).json({
            message:"username or email already register"
        })
    }

    const hashedPassword =await bcrypt.hash(password,10)

    const user = await userModel.create({
        username,
        email,
        password:hashedPassword
    })

    const token = jwt.sign(
        {id:user._id,username:user.username},
        config.JWT_KEY,
        {expiresIn:"1d"}

    )

    res.cookie("token",token)

    return res.status(200).json({
        message:"User registered successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}

export async function loginUser(req,res){
   const {email,password} = req.body
   const user = await userModel.findOne({email})
   if(!user){
    return res.status(400).json({
        message:"invalid email or password"
    })
   }

   const isPasswordValid =await bcrypt.compare(password,user.password)
   if(!isPasswordValid){
    return res.status(400).json({
        message:"invalid email or password"
    })
   }

   const token = jwt.sign(
        {id:user._id,username:user.username},
        config.JWT_KEY,
        {expiresIn:"1d"}

    )
     res.cookie("token",token)

    return res.status(200).json({
        message:"User logged in successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })



}