import { EstimateController } from "../controller/EstimateController";
import { FetchWrapper } from "../utils/FetchWrapper";

export const makeEstimateController = (): EstimateController => {
    const fetchWrapper = new FetchWrapper()
    const estimateContrller = new EstimateController(fetchWrapper)
    return estimateContrller

}