import { DriverRepository } from "../repository/DriverRepository"
import { MongoDriverRepository } from "../repository/MongoDriverRepository"
import { GetDriversByDistance } from "./GetDriversByDistance"

const dummyDrivers = [{
    id: "any_id",
    name: "Joe Doe",
    description: "any_description",
    car: "any_car",
    rating: "any_rating",
    ratio: 1,
    minimumDistance: 1
},
{
    id: "any_id",
    name: "Jane Doe",
    description: "any_description",
    car: "any_car",
    rating: "any_rating",
    ratio: 1,
    minimumDistance: 5
}]

type SutTypes = {
    sut: GetDriversByDistance
    mongoDriverRepo: DriverRepository
}

const makeSut = (): SutTypes => {
    const mongoDriverRepo = new MongoDriverRepository()
    const sut = new GetDriversByDistance(mongoDriverRepo)
    return { sut, mongoDriverRepo }
}

describe('GetDriversByDistance', () => {
    test('should return no drivers if the distance is not acceptable by any of them', async () => {
        const { sut, mongoDriverRepo } = makeSut()

        jest.spyOn(mongoDriverRepo, 'getDrivers').mockResolvedValueOnce(dummyDrivers)

        const distance = 50
        const drivers = await sut.check(distance)

        expect(drivers.length).toBe(0)
    })
})