import { RideState } from "./rideTypes"

export const rideInitialState: RideState = {
    customerId: "",
    originAddress: "",
    destinationAddress: "",
    origin: {
        lat: 0,
        long: 0
    },
    destination: {
        lat: 0,
        long: 0
    },
    distance: 0,
    duration: "",
    drivers: [],
    routeResponse: null
}