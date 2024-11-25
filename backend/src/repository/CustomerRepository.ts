import { Ride } from "../model/ride";

export interface CustomerRepository {
    saveCustomer(customerId: string, ride: Ride): Promise<void>
}