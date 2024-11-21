export class FetchWrapper {
    async fetchFromRoutesApi(originAddress: string, destinationAddress: string): Promise<any> {
        const apiResponse = await fetch('https://routes.googleapis.com/directions/v2:computeRoutes',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Goog-Api-Key': process.env.GOOGLE_API_KEY,
                    'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.legs.startLocation,routes.legs.endLocation'
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

        return apiResponse
    }
}