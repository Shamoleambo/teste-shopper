import { MongoClient } from "../db/mongo";
import { Driver } from "../model/driver";
import { DriverRepository } from "./DriverRepository";

export class MongoDriverRepository implements DriverRepository {

    async getDrivers(): Promise<Driver[]> {
        const drivers = await MongoClient.db.collection<Driver>('drivers').find({}).toArray()

        return drivers
    }

}