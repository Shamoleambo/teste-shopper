import { ResponseJSON } from "../protocols/routesApi"

export class FetchWrapper {
    async fetchFromRoutesApi(originAddress: string, destinationAddress: string): Promise<ResponseJSON> {
        const apiResponse = await fetch('https://routes.googleapis.com/directions/v2:computeRoutes',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Goog-Api-Key': process.env.GOOGLE_API_KEY,
                    'X-Goog-FieldMask': '*'
                },
                body: JSON.stringify({
                    "origin": {
                        "address": originAddress
                    },
                    "destination": {
                        "address": destinationAddress

                    },
                    "travelMode": "DRIVE"
                })
            }
        )

        const jsonResponse = await apiResponse.json()
        return jsonResponse
    }
}