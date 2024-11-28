import { RideConfirmationBody } from "../models/RideConfirmationBody"
import { RideState } from "../reducers/rideTypes"

const DriverDetails: React.FC<{
    id: string,
    name: string,
    rating: number,
    comment: string,
    car: string,
    value: number,
    rideState: RideState,
    onConfirm: (body: RideConfirmationBody) => Promise<void>
}> = (props) => {

    const handleConfirm = () => {
        const body = {
            customer_id: "",
            origin: "",
            destination: "",
            duration: props.rideState.duration,
            distance: props.rideState.distance,
            driver: { id: props.id, name: props.name },
            value: props.value
        }

        props.onConfirm(body)
    }

    return <div className="driver-details">
        <h3 className="driver-details-name">{props.name}</h3>
        <p className="driver-details-rating">
            <span className="rating-highlight"><strong>{props.rating}</strong></span>/5 - {props.comment}
        </p>
        <p className="driver-details-car">{props.car}</p>
        <p className="driver-details-value">R$ {props.value.toFixed(2)}</p>
        <button onClick={handleConfirm}>Confirm Ride</button>
    </div>
}

export default DriverDetails