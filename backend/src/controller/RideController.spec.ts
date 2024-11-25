import { CustomerRepository } from "../repository/CustomerRepository"
import { DriverRepository } from "../repository/DriverRepository"
import { MongoCustomerRepository } from "../repository/MongoCustomerRepository"
import { MongoDriverRepository } from "../repository/MongoDriverRepository"
import { Controller } from "./Controller"
import { RideController } from "./RideController"

type SutTypes = {
    driverRepository: DriverRepository
    customerRepository: CustomerRepository
    sut: Controller
}

const makeSut = (): SutTypes => {
    const driverRepository = new MongoDriverRepository()
    const customerRepository = new MongoCustomerRepository()
    const sut = new RideController(driverRepository, customerRepository)
    return { sut, driverRepository, customerRepository }
}

const mockDriver = {
    id: 'any_id',
    name: 'any_name',
    description: 'any_description',
    vehicle: 'any_vehicle',
    review: {
        rating: 3,
        comment: 'any_comment'
    },
    ratio: 4,
    minimumDistance: 1
}

const date = new Date()

const mockCustomer = {
    id: "any_id",
    rides: [
        {
            id: 1,
            customer_id: 'any_id',
            date,
            origin: 'any_origin',
            destination: 'any_destination',
            distance: '5000',
            duration: '5000s',
            driver: {
                id: 1,
                name: 'John Doe'
            },
            value: 500
        },
        {
            id: 2,
            customer_id: 'any_id',
            date,
            origin: 'any_origin',
            destination: 'any_destination',
            distance: '5000',
            duration: '5000s',
            driver: {
                id: 2,
                name: 'Jane Doe'
            },
            value: 600
        }
    ]
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

    test('should return 406 if no rides are found', async () => {
        const { sut, driverRepository, customerRepository } = makeSut()

        const httpRequest = {
            params: {
                customer_id: "any_id",
                driver_id: 123
            }
        }

        jest.spyOn(driverRepository, 'getDriverById').mockResolvedValueOnce(mockDriver)
        const findCustomerByIdSpy = jest.spyOn(customerRepository, 'findCustomerById').mockResolvedValueOnce(null)
        const httpResponse = await sut.handle(httpRequest)

        expect(findCustomerByIdSpy).toHaveBeenCalledTimes(1)
        expect(httpResponse.statusCode).toBe(404)
        expect(httpResponse.body).toEqual({
            error_code: "NO_RIDES_FOUND",
            error_description: "Nenhum registro encontrado"
        })
    })

    test('should return 200 and all rides if no drive id is provided', async () => {
        const { sut, driverRepository, customerRepository } = makeSut()

        const httpRequest = {
            params: {
                customer_id: "any_id"
            }
        }

        jest.spyOn(driverRepository, 'getDriverById').mockResolvedValueOnce(null)
        jest.spyOn(customerRepository, 'findCustomerById').mockResolvedValueOnce(mockCustomer)
        const httpResponse = await sut.handle(httpRequest)

        expect(httpResponse.statusCode).toBe(200)
        expect(httpResponse.body).toEqual({
            customer_id: "any_id",
            rides: [
                {
                    id: 1,
                    date,
                    origin: 'any_origin',
                    destination: 'any_destination',
                    distance: '5000',
                    duration: '5000s',
                    driver: {
                        id: 1,
                        name: 'John Doe'
                    },
                    value: 500
                },
                {
                    id: 2,
                    date,
                    origin: 'any_origin',
                    destination: 'any_destination',
                    distance: '5000',
                    duration: '5000s',
                    driver: {
                        id: 2,
                        name: 'Jane Doe'
                    },
                    value: 600
                }
            ]
        })
    })
})