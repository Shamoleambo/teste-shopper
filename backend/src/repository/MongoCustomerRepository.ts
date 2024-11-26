import { MongoClient } from "../db/mongo";
import { Customer } from "../model/customer";
import { Ride } from "../model/ride";
import { CustomerRepository } from "./CustomerRepository";

export class MongoCustomerRepository implements CustomerRepository {

    async saveCustomer(customerId: number, ride: Ride): Promise<void> {
        const customerFromDb = await MongoClient.db.collection<Customer>('customers').findOne({ id: customerId })
        const customerObj = { id: customerId, rides: [ride] }

        if (!customerFromDb) {
            await MongoClient.db.collection<Customer>('customers').updateOne(
                { id: customerId },
                { $set: customerObj },
                { upsert: true }
            )
        } else {
            await MongoClient.db.collection<Customer>('customers').updateOne(
                { id: customerId },
                { $push: { "rides": ride } },
                { upsert: true }
            )
        }
    }

    async findCustomerById(customerId: number): Promise<Customer> {
        const customer = await MongoClient.db.collection<Customer>('customers').findOne({ id: customerId })
        return customer
    }
}