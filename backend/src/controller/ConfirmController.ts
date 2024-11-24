import { badRequest, driverNotFound } from "../helpers/http-helper";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { DriverRepository } from "../repository/DriverRepository";
import { Controller } from "./Controller";

export class ConfirmController implements Controller {

    private readonly driverRepository: DriverRepository

    constructor(driverRepository: DriverRepository) {
        this.driverRepository = driverRepository
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const requiredFields = ['customer_id', 'origin', 'destination', 'distance', 'duration', 'driver', 'value']
        for (const field of requiredFields) {
            if (!httpRequest.body[field]) return badRequest()
            if (typeof httpRequest.body[field] == "string" && !httpRequest.body[field].trim()) return badRequest()
        }

        if (!httpRequest.body.driver.name.trim()) return badRequest()

        const driver = await this.driverRepository.getDriverById(httpRequest.body.driver._id)
        if (!driver) return driverNotFound()

        return null
    }
}