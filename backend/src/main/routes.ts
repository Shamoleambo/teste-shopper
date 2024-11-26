import { Router } from "express";
import { adaptRoute } from "./controllerAdapter";
import { makeConfirmController, makeEstimateController, makeRideController } from "./controllerFactories"

const router = Router()

router.get('/ride/:customer_id', adaptRoute(makeRideController()))
router.post('/ride/estimate', adaptRoute(makeEstimateController()))
router.patch('/ride/confirm', adaptRoute(makeConfirmController()))

export default router
