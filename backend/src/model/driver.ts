type Review = {
    rating: number
    comment: string
}

export interface Driver {
    id: string
    name: string
    description: string
    vehicle: string
    review: Review
    ratio: number
    minimumDistance: number
}