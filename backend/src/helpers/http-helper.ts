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