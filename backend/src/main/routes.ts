import { Router } from "express";
import { adaptRoute } from "./controllerAdapter";
import { makeEstimateController } from "./controllerFactories/EstimateControllerFactory";
import { makeConfirmController } from "./controllerFactories/ConfirmControllerFactory";
import { makeRideController } from "./controllerFactories/RideControllerFactory";

const router = Router()

router.get('/ride/:customer_id', adaptRoute(makeRideController()))
router.post('/ride/estimate', adaptRoute(makeEstimateController()))
router.patch('/ride/confirm', adaptRoute(makeConfirmController()))

export default router
