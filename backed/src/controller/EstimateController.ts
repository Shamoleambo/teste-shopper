import { badRequest } from "../helpers/http-helper";
import { HttpRequest, HttpResponse } from "../protocols/http";
import 'dotenv/config'
import { FetchWrapper } from "../utils/FetchWrapper";

export class EstimateController {

    private readonly fetchWrapper: FetchWrapper

    constructor(fetchWrapper: FetchWrapper) {
        this.fetchWrapper = fetchWrapper
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const requiredFields = ['customer_id', 'origin', 'destination']
        for (const field of requiredFields) {
            if (!httpRequest.body[field]) return badRequest()
            if (!httpRequest.body[field].trim()) return badRequest()
        }

        if (httpRequest.body.origin === httpRequest.body.destination) return badRequest()

        const originAddress = httpRequest.body.origin
        const destinationAddress = httpRequest.body.destination

        const routesApiResponse = this.fetchWrapper.fetchFromRoutesApi(originAddress, destinationAddress)
    }
}