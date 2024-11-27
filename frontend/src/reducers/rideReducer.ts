import { RideState, RideAction } from "./rideTypes"

export function rideReducer(state: RideState, action: RideAction): RideState {
    switch (action.type) {
        case 'SET_CUSTOMER_ID':
            return { ...state, customerId: action.payload }
        case 'SET_ORIGIN':
            return { ...state, origin: action.payload }
        case 'SET_DESTINATION':
            return { ...state, destination: action.payload }
        case 'SET_DISTANCE':
            return { ...state, distance: action.payload }
        case 'SET_DURATION':
            return { ...state, duration: action.payload }
        case 'SET_DRIVERS':
            return { ...state, drivers: action.payload }
        case 'SET_ROUTE_RESPONSE':
            return { ...state, routeResponse: action.payload }
    }
}
