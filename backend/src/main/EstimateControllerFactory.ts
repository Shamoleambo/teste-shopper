import { EstimateController } from "../controller/EstimateController";
import { MongoDriverRepository } from "../repository/MongoDriverRepository";
import { FetchWrapper } from "../utils/FetchWrapper";

export const makeEstimateController = (): EstimateController => {
    const fetchWrapper = new FetchWrapper()
    const driverRepository = new MongoDriverRepository
    const estimateController = new EstimateController(fetchWrapper, driverRepository)
    return estimateController

}