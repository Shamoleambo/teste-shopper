import { Controller } from "./Controller"
import { RideController } from "./RideController"

type SutTypes = {
    sut: Controller
}

const makeSut = (): SutTypes => {
    const sut = new RideController()
    return { sut }
}

describe('RideController', () => {
    test('should return 400 if driver is invalid', async () => {
        const { sut } = makeSut()

        const httpRequest = {
            params: {
                customer_id: "any_id",
                driver_id: 123
            }
        }

        const httpResponse = await sut.handle(httpRequest)

        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual({
            error_code: "INVALID_DRIVER",
            error_description: "Motorista inválido"
        })
    })
})