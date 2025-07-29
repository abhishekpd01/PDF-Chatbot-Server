import { Router } from "express";
import chat from "../controllers/chat.controller.js";

const chatRouter = Router();

chatRouter.get('/chat', chat);

export default chatRouter;