import { MongoClient } from "../db/mongo";
import { Driver } from "../model/driver";
import { DriverRepository } from "./DriverRepository";

export class MongoDriverRepository implements DriverRepository {

    async getDrivers(): Promise<Driver[]> {
        console.log('\n\ndentro do MongoDriverRepository\n\n')
        const drivers = await MongoClient.db.collection<Driver>('drivers').find({}).toArray()

        console.log(drivers)

        return drivers
    }

}