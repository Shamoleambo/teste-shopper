import { DriverRepository } from "../repository/DriverRepository"
import { MongoDriverRepository } from "../repository/MongoDriverRepository"
import { GetDriversByDistance } from "./GetDriversByDistance"
import { TaxiRide } from "./TaxiRide"

const dummyDrivers = [{
    id: "first_driver",
    name: "Joe Doe",
    description: "any_description",
    vehicle: "any_car",
    review: {
        rating: 2,
        comment: "any_comment"
    },
    ratio: 1,
    minimumDistance: 1
},
{
    id: "second_driver",
    name: "Jane Doe",
    description: "any_description",
    vehicle: "any_car",
    review: {
        rating: 3,
        comment: "any_comment"
    },
    ratio: 1,
    minimumDistance: 5
}]

type SutTypes = {
    sut: GetDriversByDistance
    mongoDriverRepo: DriverRepository
}

const makeSut = (): SutTypes => {
    const mongoDriverRepo = new MongoDriverRepository()
    const ride = new TaxiRide()
    const sut = new GetDriversByDistance(mongoDriverRepo, ride)
    return { sut, mongoDriverRepo }
}

describe('GetDriversByDistance', () => {
    test('should return no drivers if the distance is not acceptable by any of them', async () => {
        const { sut, mongoDriverRepo } = makeSut()

        const getDriversSpy = jest.spyOn(mongoDriverRepo, 'getDrivers').mockResolvedValueOnce(dummyDrivers)

        const distance = 50
        const drivers = await sut.check(distance)

        expect(drivers.length).toBe(0)
        expect(getDriversSpy).toHaveBeenCalledTimes(1)
    })

    test('should return only the driver with the second_driver id based on the distance provided', async () => {
        const { sut, mongoDriverRepo } = makeSut()

        jest.spyOn(mongoDriverRepo, 'getDrivers').mockResolvedValueOnce(dummyDrivers)

        const distance = 2000
        const drivers = await sut.check(distance)

        expect(drivers.length).toBe(1)
        expect(drivers[0].id).toEqual('first_driver')
    })

    test('should return the driver with the value field instead of ratio and minimumDistance', async () => {
        const { sut, mongoDriverRepo } = makeSut()

        jest.spyOn(mongoDriverRepo, 'getDrivers').mockResolvedValueOnce(dummyDrivers)

        const distance = 2000
        const drivers = await sut.check(distance)

        expect(drivers[0].value).toBe(2)
        expect(drivers).not.toHaveProperty('ratio')
        expect(drivers).not.toHaveProperty('minimumDistance')
    })
})