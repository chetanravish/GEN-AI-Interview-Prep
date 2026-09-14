import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware';
import * as interviewController from '../controller/interview.controller.js'
import { upload } from '../middlewares/file.middleware.js';
const interviewRouter = express();

interviewRouter.post("/",authMiddleware,upload.single("resume"),interviewController.generateInterviewReportController);

export default interviewRouter