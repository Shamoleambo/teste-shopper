import { ConfirmController } from "./ConfirmController"
import { Controller } from "./IController"

type SutTypes = {
    sut: Controller
}

const makeSut = (): SutTypes => {
    const sut = new ConfirmController()
    return { sut }
}

describe('ConfirmController', () => {
    test('should return 400 if there is no customer_id', async () => {
        const { sut } = makeSut()

        const httpRequest = {
            body: {
                origin: "any_origin",
                destination: "any_destination",
                distance: 100,
                duration: "any_duration",
                driver: {
                    id: 123,
                    name: "any_name"
                },
                value: 123
            }
        }
        const httpResponse = await sut.handle(httpRequest)

        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual({
            "error_code": "INVALID_DATA",
            "error_description": "Os dados fornecidos no corpo da requisição são inválidos"
        })
    })
})