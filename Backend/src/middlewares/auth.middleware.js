import jwt from 'jsonwebtoken'
import config from '../config/config.js'
import {tokenBlacklistModel}  from '../models/blacklist.model.js'

export async function authMiddleware(req,res,next){
const token = req.cookies.token
if(!token){
    return res.status(401).json({
        message:"token not found"
    })
}

const isTokenBlacklisted = await tokenBlacklistModel.findOne({token})
if(isTokenBlacklisted){
    return res.status(401).json({
        message:"Token is invalid"
    })
}
try{
      const decoded = jwt.verify(token,config.JWT_KEY)
      req.user=decoded
      next()
}catch(err){
    return res.status(401).json({
        message:"Invalid token"
    })
}
}