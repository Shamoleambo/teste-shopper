import { Customer } from "../model/customer";
import { Ride } from "../model/ride";

export interface CustomerRepository {
    saveCustomer(customerId: number, ride: Ride): Promise<void>
    findCustomerById(customerId: number): Promise<Customer>
}