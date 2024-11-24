import { Driver } from "../model/driver";

export interface DriverRepository {
    getDrivers(): Promise<Driver[]>
    getDriverById(id: string): Promise<Driver>
}