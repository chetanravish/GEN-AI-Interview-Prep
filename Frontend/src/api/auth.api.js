import axiosInstance from "../utils/axiosinstance";

export const registerUser = async(username,email,password)=>{
    const {data} = await axiosInstance.post("/api/auth/register",{
        username,email,password
    })
    return data;
}

export const loginUser = async(email,password)=>{
    const {data} = await axiosInstance.post("/api/auth/login",{
        email,password
    })
    return data;
}

export const logoutUser = async()=>{
    await axiosInstance.get("/api/auth/logout")
}

export const getUser = async(token)=>{
    const {data} = await axiosInstance.get("/api/auth/get-me",{
        token
    })
    return data;
}

export const verifyEmail = async(otp,email)=>{
    const {data} = await axiosInstance.post("/api/auth/verify-email",{
        otp,email
    })
    return data;
}