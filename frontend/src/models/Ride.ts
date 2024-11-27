export interface Ride {
    id: number
    date: string
    origin: string
    destination: string
    distance: number
    duration: string
    driver: {
        id: string
        name: string
    }
    value: number
}
