import { ConfirmController } from "../../controller/ConfirmController";
import { MongoCustomerRepository } from "../../repository/MongoCustomerRepository";
import { MongoDriverRepository } from "../../repository/MongoDriverRepository";

export const makeConfirmController = (): ConfirmController => {
    const driverRepository = new MongoDriverRepository()
    const customerRepository = new MongoCustomerRepository()
    const confirmController = new ConfirmController(driverRepository, customerRepository)
    return confirmController
}