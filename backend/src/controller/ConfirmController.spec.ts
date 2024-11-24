import { Driver } from "../model/driver"
import { DriverRepository } from "../repository/DriverRepository"
import { MongoDriverRepository } from "../repository/MongoDriverRepository"
import { ConfirmController } from "./ConfirmController"
import { Controller } from "./Controller"

type SutTypes = {
    sut: Controller
    driverRepository: DriverRepository
}

const makeSut = (): SutTypes => {
    const driverRepository = new MongoDriverRepository()
    const sut = new ConfirmController(driverRepository)
    return { sut, driverRepository }
}

describe('ConfirmController', () => {
    test('should return 400 if there is no customer_id in the request', async () => {
        const { sut } = makeSut()

        const httpRequest = {
            body: {
                origin: "any_origin",
                destination: "any_destination",
                distance: 100,
                duration: "any_duration",
                driver: {
                    _id: 123,
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

    test('should return 400 if there is no origin in the request', async () => {
        const { sut } = makeSut()

        const httpRequest = {
            body: {
                customer_id: '123',
                destination: "any_destination",
                distance: 100,
                duration: "any_duration",
                driver: {
                    _id: 123,
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

    test('should return 400 if there is no destination in the request', async () => {
        const { sut } = makeSut()

        const httpRequest = {
            body: {
                customer_id: '123',
                origin: 'any_origin',
                distance: 100,
                duration: "any_duration",
                driver: {
                    _id: 123,
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

    test('should return 400 if there is no distance in the request', async () => {
        const { sut } = makeSut()

        const httpRequest = {
            body: {
                customer_id: '123',
                origin: 'any_origin',
                destination: 'any_destination',
                duration: "any_duration",
                driver: {
                    _id: 123,
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

    test('should return 400 if there is no duration in the request', async () => {
        const { sut } = makeSut()

        const httpRequest = {
            body: {
                customer_id: '123',
                origin: 'any_origin',
                destination: 'any_destination',
                distance: 100,
                driver: {
                    _id: 123,
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

    test('should return 400 if there is no driver in the request', async () => {
        const { sut } = makeSut()

        const httpRequest = {
            body: {
                customer_id: '123',
                origin: 'any_origin',
                destination: 'any_destination',
                distance: 100,
                duration: 'any_duration',
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

    test('should return 400 if there is no value in the request', async () => {
        const { sut } = makeSut()

        const httpRequest = {
            body: {
                customer_id: '123',
                origin: 'any_origin',
                destination: 'any_destination',
                distance: 100,
                duration: 'any_duration',
                driver: {
                    _id: 123,
                    name: "any_name"
                }
            }
        }
        const httpResponse = await sut.handle(httpRequest)

        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual({
            "error_code": "INVALID_DATA",
            "error_description": "Os dados fornecidos no corpo da requisição são inválidos"
        })
    })

    test('should return 400 if customer_id field is blank', async () => {
        const { sut } = makeSut()

        const httpRequest = {
            body: {
                "customer_id": ' ',
                origin: 'any_origin',
                destination: 'any_destination',
                distance: 100,
                duration: 'any_duration',
                driver: {
                    _id: 123,
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

    test('should return 400 if the name field from driver is blank', async () => {
        const { sut } = makeSut()

        const httpRequest = {
            body: {
                "customer_id": 'any_id',
                origin: 'any_origin',
                destination: 'any_destination',
                distance: 100,
                duration: 'any_duration',
                driver: {
                    _id: 123,
                    name: " "
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

    test('should return 404 if the driver is not found', async () => {
        const { sut, driverRepository } = makeSut()

        const httpRequest = {
            body: {
                "customer_id": 'any_id',
                origin: 'any_origin',
                destination: 'any_destination',
                distance: 100,
                duration: 'any_duration',
                driver: {
                    _id: 123,
                    name: "any_name"
                },
                value: 123
            }
        }

        jest.spyOn(driverRepository, 'getDriverById').mockResolvedValueOnce(null)
        const httpResponse = await sut.handle(httpRequest)

        expect(httpResponse.statusCode).toBe(404)
        expect(httpResponse.body).toEqual({
            "error_code": "DRIVER_NOT_FOUND",
            "error_description": "Motorista não encontrado"
        })
    })
})