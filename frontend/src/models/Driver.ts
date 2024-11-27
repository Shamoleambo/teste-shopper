type Review = {
    rating: number
    comment: string
}

export interface Driver {
    _id: string
    id: string
    name: string
    review: Review
    value: number
    vehicle: string
}