import { invalidDriver, noRidesFound, ok } from "../helpers/http-helper";
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
        let customer, editedRides
        const driverId = httpRequest.query.driver_id
        const customerId = +httpRequest.params.customer_id

        const returnedCustomer = {
            customer_id: null,
            rides: []
        }

        if (!driverId) {
            customer = await this.customerRepository.findCustomerById(customerId)
            if (!customer || customer.rides.length == 0) return noRidesFound()


            returnedCustomer.customer_id = customer.id
            editedRides = customer.rides.map(ride => {
                delete ride.customer_id
                return ride
            })
            returnedCustomer.rides = editedRides

            return ok(returnedCustomer)
        }

        const driver = await this.driverRepository.getDriverById(driverId)
        if (!driver) return invalidDriver()

        customer = await this.customerRepository.findCustomerById(customerId)
        if (!customer || customer.rides.length == 0) return noRidesFound()

        returnedCustomer.customer_id = customer.id

        editedRides = customer.rides.filter(ride => ride.driver.id === driverId)
        editedRides = editedRides.map(ride => {
            delete ride.customer_id
            return ride
        })

        returnedCustomer.rides = editedRides

        return ok(returnedCustomer)
    }
}