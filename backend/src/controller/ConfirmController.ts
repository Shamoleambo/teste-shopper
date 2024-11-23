import { badRequest } from "../helpers/http-helper";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { Controller } from "./Controller";

export class ConfirmController implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const requiredFields = ['customer_id', 'origin', 'destination', 'distance', 'duration', 'driver', 'value']
        for (const field of requiredFields) {
            if (!httpRequest.body[field]) return badRequest()
            if (typeof httpRequest.body[field] == "string" && !httpRequest.body[field].trim()) return badRequest()
        }

        if (!httpRequest.body.driver.name.trim()) return badRequest()

        return null
    }
}