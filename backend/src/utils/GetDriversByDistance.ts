import { DriverRepository } from "../repository/DriverRepository";

export class GetDriversByDistance {
    constructor(private readonly mongoDriversRepository: DriverRepository) {
        this.mongoDriversRepository = mongoDriversRepository
    }

    async check(distance: number) {
        return []
    }
}