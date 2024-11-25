import { Ride } from "./ride"

export interface Customer {
    id: string
    rides: Ride[]
}
