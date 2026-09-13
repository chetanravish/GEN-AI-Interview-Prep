import dotenv from 'dotenv'
dotenv.config();

if(!process.env.MONGO_URI){
    throw new Error("Mongo URI is not defined")
}

if(!process.env.JWT_KEY){
    throw new Error("JWT_KEY is not defined")
}

const config = {
    MONGO_URI:process.env.MONGO_URI,
    JWT_KEY:process.env.JWT_KEY,
}
export default config;