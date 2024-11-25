import { HttpResponse } from "../protocols/http";

export const badRequest = (): HttpResponse => ({
    statusCode: 400,
    body: {
        "error_code": "INVALID_DATA",
        "error_description": "Os dados fornecidos no corpo da requisição são inválidos"
    }
})

export const ok = (data: any): HttpResponse => ({
    statusCode: 200,
    body: data
})

export const driverNotFound = (): HttpResponse => ({
    statusCode: 404,
    body: {
        "error_code": "DRIVER_NOT_FOUND",
        "error_description": "Motorista não encontrado"
    }
})

export const distanceNotValidForDriver = (): HttpResponse => ({
    statusCode: 406,
    body: {
        "error_code": "INVALID_DISTANCE",
        "error_description": "Quilometragem inválida para o motorista"
    }
})

export const invalidDriver = (): HttpResponse => ({
    statusCode: 400,
    body: {
        error_code: "INVALID_DRIVER",
        error_description: "Motorista inválido"
    }
})
