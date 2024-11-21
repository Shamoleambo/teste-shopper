import { badRequest } from "../helpers/http-helper";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class ApiController {
    handle(httpRequest: HttpRequest): HttpResponse {
        return badRequest()
    }
}