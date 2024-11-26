import { Router } from "express";
import { adaptRoute } from "./controllerAdapter";
import { makeEstimateController } from "./controllerFactories/EstimateControllerFactory";
import { makeConfirmController } from "./controllerFactories/ConfirmControllerFactory";

const router = Router()

router.post('/ride/estimate', adaptRoute(makeEstimateController()))
router.patch('/ride/confirm', adaptRoute(makeConfirmController()))

export default router
