import axios from "axios";

// Matches Backend/src/app.js -> app.use("/api/auth", authRouter)
// and server.js -> app.listen(3000)
const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true, // required: backend sets/reads an httpOnly-style "token" cookie
});

export default api;
