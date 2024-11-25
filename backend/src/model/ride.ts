type DriverRide = {
    id: number
    name: string
}

export interface Ride {
    id: number
    customer_id: string
    date: Date
    origin: string
    destination: string
    distance: string
    duration: string
    driver: DriverRide
    value: number
}
