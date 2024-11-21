import { badRequest } from "../helpers/http-helper";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class ApiController {
    handle(httpRequest: HttpRequest): HttpResponse {
        const requiredFields = ['customer_id', 'origin', 'destination']
        for (const field of requiredFields) {
            if (!httpRequest.body[field]) return badRequest()
        }

        if (httpRequest.body.origin === httpRequest.body.destination) return badRequest()
    }
}