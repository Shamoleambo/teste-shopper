export interface RideConfirmationBody {
    customer_id: string
    origin: string
    destination: string
    distance: number
    driver: {
        id: string
        name: string
    }
    value: number
}
