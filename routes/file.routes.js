import { Router } from "express";
import { upload, uploadFile } from "../controllers/file.controller.js";

const fileRouter = Router();

fileRouter.post('/upload/pdf', upload.single('pdf'), uploadFile)

export default fileRouter;