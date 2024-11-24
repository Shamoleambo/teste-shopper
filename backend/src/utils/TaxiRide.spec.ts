import { TaxiRide } from "./TaxiRide"

describe('TaxiRide', () => {
    test('should return the correct value from the driver data', () => {
        const sut = new TaxiRide()

        const driver = {
            id: 'any_id',
            name: "Joe Doe",
            description: "any_description",
            vehicle: "any_vehicle",
            review: {
                rating: 2,
                comment: "any_comment"
            },
            ratio: 5,
            minimumDistance: 1
        }
        const distance = 2000

        const value = sut.calculateValue(driver, distance)

        expect(value).toBe(10)
    })
})