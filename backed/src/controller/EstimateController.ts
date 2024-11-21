import { badRequest } from "../helpers/http-helper";
import { HttpRequest, HttpResponse } from "../protocols/http";
import 'dotenv/config'

export class EstimateController {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const requiredFields = ['customer_id', 'origin', 'destination']
        for (const field of requiredFields) {
            if (!httpRequest.body[field]) return badRequest()
            if (!httpRequest.body[field].trim()) return badRequest()
        }

        if (httpRequest.body.origin === httpRequest.body.destination) return badRequest()

        const routesApiResponse = await fetch('https://routes.googleapis.com/directions/v2:computeRoutes',
            { method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': process.env.GOOGLE_API_KEY,
                'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.legs.startLocation,routes.legs.endLocation'}
            }
        )
    }
}