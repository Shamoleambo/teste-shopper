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

    return <div>
        <h3>{props.name}</h3>
        <p><strong>{props.rating}</strong>/5 - {props.comment}</p>
        <p>{props.car}</p>
        <p>R$ {props.value}</p>
        <button onClick={handleConfirm}>Confirm Ride</button>
    </div>
}

export default DriverDetails