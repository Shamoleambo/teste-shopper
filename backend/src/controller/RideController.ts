import { invalidDriver } from "../helpers/http-helper";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { Controller } from "./Controller";

export class RideController implements Controller {

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        return invalidDriver()
    }
}