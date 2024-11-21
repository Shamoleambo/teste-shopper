import { FetchWrapper } from "../utils/FetchWrapper"
import { EstimateController } from "./EstimateController"

const makeSut = (): EstimateController => {
    const fetchWrapper = new FetchWrapper();
    const sut = new EstimateController(fetchWrapper)
    return sut
}

describe('EstimateController', () => {
    test('should return 400 if no origin is provided', async () => {
        const sut = makeSut()

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
        const sut = makeSut()

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
        const sut = makeSut()

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
        const sut = makeSut()

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
        const sut = makeSut()

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
})
