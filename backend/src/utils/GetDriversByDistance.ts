import { ResponseDriver } from "../protocols/ResponseDrivers";
import { DriverRepository } from "../repository/DriverRepository";
import { TaxiRide } from "./TaxiRide";

export class GetDriversByDistance {
    constructor(private readonly mongoDriversRepository: DriverRepository, private readonly ride: TaxiRide) {
        this.mongoDriversRepository = mongoDriversRepository
        this.ride = ride
    }

    async check(distance: number): Promise<ResponseDriver[]> {

        const drivers = await this.mongoDriversRepository.getDrivers()
        const filteredDrivers = drivers.filter(driver => distance >= driver.minimumDistance * 1000)

        const responseDrivers = filteredDrivers.map(d => {
            const value = this.ride.calculateValue(d, distance)
            const driver = { ...d, value }
            delete driver.ratio
            delete driver.minimumDistance
            return driver
        })

        return responseDrivers
    }
}