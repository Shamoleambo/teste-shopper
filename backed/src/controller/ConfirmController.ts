import { badRequest } from "../helpers/http-helper";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { Controller } from "./IController";

export class ConfirmController implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const requiredFields = ['customer_id', 'origin', 'destination', 'distance']
        for(const field of requiredFields) {
            if(!httpRequest.body[field]) return badRequest()
        }

        return null
    }
}