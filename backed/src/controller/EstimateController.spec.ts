import { EstimateController } from "./EstimateController"
import 'dotenv/config'

const routesApiDummyReturn = {
    "routes": [
        {
            "legs": [
                {
                    "startLocation": {
                        "latLng": {
                            "latitude": 37.4227804,
                            "longitude": -122.08412609999999
                        }
                    },
                    "endLocation": {
                        "latLng": {
                            "latitude": 37.7353976,
                            "longitude": -122.50666500000001
                        }
                    }
                }
            ],
            "distanceMeters": 57498,
            "duration": "2403s"
        }
    ]
}

describe('EstimateController', () => {
    test('should return 400 if no origin is provided', async () => {
        const sut = new EstimateController()

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
        const sut = new EstimateController()

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
        const sut = new EstimateController()

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
        const sut = new EstimateController()

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
        const sut = new EstimateController()

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

    test('should call fetch API with correct parameters', async () => {
        const sut = new EstimateController()

        const httpRequest = {
            body: {
                'customer_id': 'any_id',
                'origin': 'any_origin',
                'destination': 'any_destination'
            }
        }
        const url = 'https://routes.googleapis.com/directions/v2:computeRoutes'
        const method = 'POST'
        const headers = {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': process.env.GOOGLE_API_KEY,
            'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.legs.startLocation,routes.legs.endLocation'
        }

        const fetchSpy = jest.spyOn(global, 'fetch')
        await sut.handle(httpRequest)

        expect(fetchSpy).toHaveBeenCalledWith(url, { method, headers })
    })
})
