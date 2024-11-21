import { HttpRequest, HttpResponse } from "../protocols/http";

export class ApiController {
    handle(httpRequest: HttpRequest): HttpResponse {
        return {
            statusCode: 400,
            body: {
                "error_code": "INVALID_DATA",
                "error_description": "any_description"
            }
        }
    }
}