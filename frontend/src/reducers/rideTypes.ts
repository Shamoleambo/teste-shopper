import { Coordinates } from "../models/Coordinates"
import { Driver } from "../models/Driver"

export interface RideState {
    origin: Coordinates
    destination: Coordinates
    distance: number
    duration: string
    drivers: Driver[]
    routeResponse: any
}

export type RideAction =
    | { type: 'SET_ORIGIN'; payload: Coordinates }
    | { type: 'SET_DESTINATION'; payload: Coordinates }
    | { type: 'SET_DISTANCE'; payload: number }
    | { type: 'SET_DURATION'; payload: string }
    | { type: 'SET_DRIVERS'; payload: Driver[] }
    | { type: 'SET_ROUTE_RESPONSE'; payload: any }
