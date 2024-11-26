import { ObjectId } from "mongodb";
import { badRequest, distanceNotValidForDriver, driverNotFound, ok } from "../helpers/http-helper";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { CustomerRepository } from "../repository/CustomerRepository";
import { DriverRepository } from "../repository/DriverRepository";
import { Controller } from "./Controller";

export class ConfirmController implements Controller {

    private readonly driverRepository: DriverRepository
    private readonly customerRepository: CustomerRepository

    constructor(driverRepository: DriverRepository, customerRepository) {
        this.driverRepository = driverRepository
        this.customerRepository = customerRepository
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const requiredFields = ['customer_id', 'origin', 'destination', 'distance', 'duration', 'driver', 'value']
        for (const field of requiredFields) {
            if (!httpRequest.body[field]) return badRequest()
            if (typeof httpRequest.body[field] == "string" && !httpRequest.body[field].trim()) return badRequest()
        }

        if (httpRequest.body.origin === httpRequest.body.destination) return badRequest()

        if (!httpRequest.body.driver.name.trim()) return badRequest()

        const driver = await this.driverRepository.getDriverById(httpRequest.body.driver.id)
        if (!driver) return driverNotFound()

        if (driver.minimumDistance * 1000 > httpRequest.body.distance) return distanceNotValidForDriver()

        const customerId = +httpRequest.body.customer_id
        const ride = {
            id: Math.floor(Math.random() * 10000),
            "customer_id": httpRequest.body.customer_id,
            date: new Date(),
            origin: httpRequest.body.origin,
            destination: httpRequest.body.destination,
            distance: httpRequest.body.distance,
            duration: httpRequest.body.duration,
            driver: {
                id: httpRequest.body.driver.id,
                name: httpRequest.body.driver.name
            },
            value: httpRequest.body.value
        }

        await this.customerRepository.saveCustomer(customerId, ride)

        return ok({ success: true })
    }
}