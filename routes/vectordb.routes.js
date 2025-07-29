import { Router } from "express";
import cleanUp from "../controllers/vectordb.controller.js";

const vectordbRouter = Router();

vectordbRouter.post('/cleanUpResources', cleanUp)

export default vectordbRouter;