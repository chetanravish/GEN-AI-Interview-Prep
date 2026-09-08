import {Router} from 'express'
import * as authController from '../controller/auth.controller.js'
import {authMiddleware} from '../middlewares/auth.middleware.js';
const authRouter = Router();

authRouter.post("/register",authController.registerUser)
authRouter.post("/login",authController.loginUser)
authRouter.get("/logout",authController.logoutUser)
authRouter.get("/get-me",authMiddleware,authController.getMe)
authRouter.post("/verify-email",authController.verifyEmail)
export default authRouter;