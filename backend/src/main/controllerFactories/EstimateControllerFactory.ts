import { EstimateController } from "../../controller/EstimateController";
import { MongoDriverRepository } from "../../repository/MongoDriverRepository";
import { FetchWrapper } from "../../utils/FetchWrapper";
import { GetDriversByDistance } from "../../utils/GetDriversByDistance";
import { TaxiRide } from "../../utils/TaxiRide";

export const makeEstimateController = (): EstimateController => {
    const fetchWrapper = new FetchWrapper()
    const driverRepository = new MongoDriverRepository
    const taxiRide = new TaxiRide()
    const getDriversByDistance = new GetDriversByDistance(driverRepository, taxiRide)
    const estimateController = new EstimateController(fetchWrapper, getDriversByDistance)
    return estimateController

}