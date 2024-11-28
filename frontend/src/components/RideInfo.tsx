import { Ride } from "../models/Ride"

const RideInfo: React.FC<{ ride: Ride }> = (props) => {
    return <div>
        <h4>{props.ride.date}</h4>
        <ul>
            <li>Origin Address: <strong>{props.ride.origin}</strong></li>
            <li>Destination Address: <strong>{props.ride.destination}</strong></li>
            <li>Distance(m): <strong>{props.ride.distance}</strong></li>
            <li>Duration(s): <strong>{props.ride.duration}</strong></li>
            <li>Driver Name: <strong>{props.ride.driver.name}</strong></li>
            <li>R$ {props.ride.value.toFixed(2)}</li>
        </ul>
    </div>
}

export default RideInfo