import { RideController } from "../../controller/RideController"
import { MongoCustomerRepository } from "../../repository/MongoCustomerRepository"
import { MongoDriverRepository } from "../../repository/MongoDriverRepository"

export const makeRideController = (): RideController => {
    const driverRepository = new MongoDriverRepository()
    const customerRepository = new MongoCustomerRepository()
    const rideController = new RideController(driverRepository, customerRepository)
    return rideController
}