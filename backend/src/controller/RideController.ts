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
        let customer
        const driverId = httpRequest.params.driver_id

        if (!driverId) {
            customer = await this.customerRepository.findCustomerById(httpRequest.params.customer_id)
            if (!customer || customer.rides.length == 0) return noRidesFound()

            const returnedCustomer = {
                customer_id: null,
                rides: []
            }
            returnedCustomer.customer_id = customer.id
            const editedRides = customer.rides.map(ride => {
                delete ride.customer_id
                return ride
            })
            returnedCustomer.rides = editedRides

            return ({
                statusCode: 200,
                body: returnedCustomer
            })
        }
        const driver = await this.driverRepository.getDriverById(driverId)
        if (!driver) return invalidDriver()

        customer = await this.customerRepository.findCustomerById(httpRequest.params.customer_id)
        if (!customer || customer.rides.length == 0) return noRidesFound()

        return null
    }
}