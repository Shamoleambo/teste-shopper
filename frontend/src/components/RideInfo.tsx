import { Ride } from "../models/Ride"

const RideInfo: React.FC<{ ride: Ride }> = (props) => {
    return <div>
        <h4>{Date.parse(props.ride.date)}</h4>
        <ul>
            <li>{props.ride.origin}</li>
            <li>{props.ride.destination}</li>
            <li>{props.ride.distance}</li>
            <li>{props.ride.duration}</li>
            <li>{props.ride.driver.name}</li>
            <li>R$ {props.ride.value}</li>
        </ul>
    </div>
}

export default RideInfo