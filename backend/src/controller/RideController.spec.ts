import { Controller } from "./Controller"
import { RideController } from "./RideController"

type SutTypes = {
    sut: Controller
}
    driverRepository: DriverRepository

const makeSut = (): SutTypes => {
    const driverRepository = new MongoDriverRepository()
    const sut = new RideController(driverRepository)
    return { sut, driverRepository }
}

describe('RideController', () => {
    test('should return 400 if driver is invalid', async () => {
        const { sut, driverRepository } = makeSut()

        const httpRequest = {
            params: {
                customer_id: "any_id",
                driver_id: 123
            }
        }

        const getDriverByIdSpy = jest.spyOn(driverRepository, 'getDriverById').mockResolvedValueOnce(null)
        const httpResponse = await sut.handle(httpRequest)

        expect(getDriverByIdSpy).toHaveBeenCalledTimes(1)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual({
            error_code: "INVALID_DRIVER",
            error_description: "Motorista inválido"
        })
    })
})