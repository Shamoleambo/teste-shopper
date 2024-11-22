import { FetchWrapper } from "../utils/FetchWrapper"
import { EstimateController } from "./EstimateController"

type makeSutTypes = {
    sut: EstimateController,
    fetchWrapper: FetchWrapper
}

const makeSut = (): makeSutTypes => {
    const fetchWrapper = new FetchWrapper();
    const sut = new EstimateController(fetchWrapper)
    return { sut, fetchWrapper }
}

describe('EstimateController', () => {
    test('should return 400 if no origin is provided', async () => {
        const { sut } = makeSut()

        const httpRequest = {
            'body': {
                "customer_id": "any_id",
                "destination": "any_destination"
            }

        }
        const httpResponse = await sut.handle(httpRequest)

        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual({
            "error_code": "INVALID_DATA",
            "error_description": "Os dados fornecidos no corpo da requisição são inválidos"
        })
    })

    test('should return 400 if no destination is provided', async () => {
        const { sut } = makeSut()

        const httpRequest = {
            'body': {
                "customer_id": "any_id",
                "origin": "any_origin"
            }

        }
        const httpResponse = await sut.handle(httpRequest)

        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual({
            "error_code": "INVALID_DATA",
            "error_description": "Os dados fornecidos no corpo da requisição são inválidos"
        })
    })

    test('should return 400 if no customer_id is provided', async () => {
        const { sut } = makeSut()

        const httpRequest = {
            'body': {
                'origin': 'any_origin',
                'destination': 'Os dados fornecidos no corpo da requisição são inválidos'
            }

        }
        const httpResponse = await sut.handle(httpRequest)

        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual({
            "error_code": "INVALID_DATA",
            "error_description": "Os dados fornecidos no corpo da requisição são inválidos"
        })
    })

    test('should return 400 if origin address is equal to the destination address', async () => {
        const { sut } = makeSut()

        const httpRequest = {
            'body': {
                'customer_id': 'any_id',
                'origin': 'any_address',
                'destination': 'any_address'
            }

        }
        const httpResponse = await sut.handle(httpRequest)

        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual({
            "error_code": "INVALID_DATA",
            "error_description": "Os dados fornecidos no corpo da requisição são inválidos"
        })
    })

    test('should return 400 if customer_id, origin or destination is a string of blank spaces', async () => {
        const { sut } = makeSut()

        const httpRequest = {
            'body': {
                'customer_id': '   ',
                'origin': '    ',
                'destination': '   '
            }
        }
        const httpResponse = await sut.handle(httpRequest)

        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual({
            "error_code": "INVALID_DATA",
            "error_description": "Os dados fornecidos no corpo da requisição são inválidos"
        })
    })

    test('should return 200 for success case', async () => {
        const { sut, fetchWrapper } = makeSut()

        const httpRequest = {
            'body': {
                'customer_id': 'any_id',
                'origin': 'any_origin',
                'destination': 'any_destination'
            }
        }

        jest.spyOn(fetchWrapper, 'fetchFromRoutesApi').mockResolvedValueOnce({
            "routes": [
                {
                    "legs": [
                        {
                            "startLocation": {
                                "latLng": {
                                    "latitude": 123,
                                    "longitude": 321
                                }
                            },
                            "endLocation": {
                                "latLng": {
                                    "latitude": 345,
                                    "longitude": 543
                                }
                            }
                        }
                    ],
                    "distanceMeters": 100,
                    "duration": "3600s"
                }
            ]
        })

        const httpResponse = await sut.handle(httpRequest)

        expect(httpResponse.statusCode).toBe(200)
        expect(httpResponse.body.distance).toBe(100)
        expect(httpResponse.body.duration).toEqual("3600s")
        expect(httpResponse.body.origin.latitude).toBe(123)
        expect(httpResponse.body.origin.longitude).toBe(321)
        expect(httpResponse.body.destination.latitude).toBe(345)
        expect(httpResponse.body.destination.longitude).toBe(543)
    })
})