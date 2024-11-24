type Review = {
    rating: number
    comment: string
}

export interface ResponseDriver {
    id: string
    name: string
    description: string
    vehicle: string
    review: Review
    value: number
}