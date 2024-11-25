import { invalidDriver } from "../helpers/http-helper";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { DriverRepository } from "../repository/DriverRepository";
import { Controller } from "./Controller";

export class RideController implements Controller {

    private readonly driverRepository: DriverRepository

    constructor(driverRepository: DriverRepository) {
        this.driverRepository = driverRepository
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const driver = await this.driverRepository.getDriverById(httpRequest.params.driver_id)
        if(!driver) return invalidDriver()
        
        return null
    }
}