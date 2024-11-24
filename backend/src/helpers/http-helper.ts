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