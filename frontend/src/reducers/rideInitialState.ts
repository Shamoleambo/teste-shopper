import { RideState } from "./rideTypes"

export const rideInitialState: RideState = {
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