import { DriverRepository } from "../repository/DriverRepository";

export class GetDriversByDistance {
    constructor(private readonly mongoDriversRepository: DriverRepository) {
        this.mongoDriversRepository = mongoDriversRepository
    }

    async check(distance: number) {

        const drivers = await this.mongoDriversRepository.getDrivers()
        const filteredDrivers = drivers.filter(driver => distance >= driver.minimumDistance * 1000)

        return filteredDrivers
    }
}