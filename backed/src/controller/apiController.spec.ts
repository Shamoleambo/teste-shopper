import { ApiController } from "./apiController"

describe('api Controller', () => {
    test('should return 400 if no origin is provided', () => {
        const sut = new ApiController()

        const httpRequest = {
            'body': {
                "customer_id": "any_id",
                "destination": "any_destination"
            }

        }
        const httpResponse = sut.handle(httpRequest)

        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual({
            "error_code": "INVALID_DATA",
            "error_description": "Os dados fornecidos no corpo da requisição são inválidos"
        })
    })

    test('should return 400 if no destination is provided', () => {
        const sut = new ApiController()

        const httpRequest = {
            'body': {
                "customer_id": "any_id",
                "origin": "any_origin"
            }

        }
        const httpResponse = sut.handle(httpRequest)

        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual({
            "error_code": "INVALID_DATA",
            "error_description": "Os dados fornecidos no corpo da requisição são inválidos"
        })
    })

    test('should return 400 if no customer_id is provided', () => {
        const sut = new ApiController()

        const httpRequest = {
            'body': {
                'origin': 'any_origin',
                'destination': 'Os dados fornecidos no corpo da requisição são inválidos'
            }

        }
        const httpResponse = sut.handle(httpRequest)

        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual({
            "error_code": "INVALID_DATA",
            "error_description": "Os dados fornecidos no corpo da requisição são inválidos"
        })
    })

    test('should return 400 if origin address is equal to the destination address', () => {
        const sut = new ApiController()

        const httpRequest = {
            'body': {
                'customer_id': 'any_id',
                'origin': 'any_address',
                'destination': 'any_address'
            }

        }
        const httpResponse = sut.handle(httpRequest)

        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual({
            "error_code": "INVALID_DATA",
            "error_description": "Os dados fornecidos no corpo da requisição são inválidos"
        })
    })
})