import { badRequest, ok } from "../helpers/http-helper";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { FetchWrapper } from "../utils/FetchWrapper";
import { Controller } from './IController'

export class EstimateController implements Controller {

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

        const json = await this.fetchWrapper.fetchFromRoutesApi(originAddress, destinationAddress)
        const [originLatitude, originLongitude] = [json.routes[0].legs[0].startLocation.latLng.latitude, json.routes[0].legs[0].startLocation.latLng.longitude]
        const [destinationLatitude, destinationLongitude] = [json.routes[0].legs[0].endLocation.latLng.latitude, json.routes[0].legs[0].endLocation.latLng.longitude]
        const [distance, duration] = [json.routes[0].distanceMeters, json.routes[0].duration]

        const responseBody = {
            origin: {
                latitude: originLatitude,
                longitude: originLongitude
            },
            destination: {
                latitude: destinationLatitude,
                longitude: destinationLongitude
            },
            distance,
            duration
        }

        return ok(responseBody)
    }
}