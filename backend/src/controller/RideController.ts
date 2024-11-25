import { HttpRequest, HttpResponse } from "../protocols/http";
import { Controller } from "./Controller";

export class RideController implements Controller {

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        return ({
            statusCode: 400,
            body: {
                error_code: "INVALID_DRIVER",
                error_description: "Motorista inválido"
            }
        })
    }
}