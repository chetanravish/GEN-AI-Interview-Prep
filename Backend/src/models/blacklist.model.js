import mongoose from 'mongoose'
import monggose from 'mongoose'

const blacklistTokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required:[true,"token is required to blacklist"]
    }
},
{
    timestamps:true
})

export const tokenBlacklistModel = mongoose.model("blacklistToken",blacklistTokenSchema)
