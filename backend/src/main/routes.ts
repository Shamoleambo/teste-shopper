import { Router } from "express";
import { adaptRoute } from "./controllerAdapter";
import { makeEstimateController } from "./EstimateControllerFactory";

const router = Router()

router.post('/ride/estimate', adaptRoute(makeEstimateController()))

export default router