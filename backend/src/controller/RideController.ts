import { invalidDriver, noRidesFound } from "../helpers/http-helper";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { CustomerRepository } from "../repository/CustomerRepository";
import { DriverRepository } from "../repository/DriverRepository";
import { Controller } from "./Controller";

export class RideController implements Controller {

    private readonly driverRepository: DriverRepository
    private readonly customerRepository: CustomerRepository

    constructor(driverRepository: DriverRepository, customerRepository: CustomerRepository) {
        this.driverRepository = driverRepository
        this.customerRepository = customerRepository
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const driver = await this.driverRepository.getDriverById(httpRequest.params.driver_id)
        if (!driver) return invalidDriver()

        const customer = await this.customerRepository.findCustomerById(httpRequest.params.customer_id)
        if (!customer || customer.rides.length == 0) return noRidesFound()

        return null
    }
}