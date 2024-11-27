import { Driver } from "../models/Driver"
import { RideConfirmationBody } from "../models/RideConfirmationBody"
import { RideState } from "../reducers/rideTypes"
import DriverDetails from "./DriverDetails"

const DriversInfo: React.FC<{
    drivers: Driver[],
    rideState: RideState,
    onConfirmDriver: (body: RideConfirmationBody) => Promise<void>
}> = (props) => {

    return <>
        <ul>{props.drivers.map(driver => (
            <li key={driver.id}>
                <DriverDetails
                    id={driver.id}
                    name={driver.name}
                    rating={driver.review.rating}
                    comment={driver.review.comment}
                    car={driver.vehicle}
                    value={driver.value}
                    rideState={props.rideState}
                    onConfirm={props.onConfirmDriver}
                />
            </li>
        ))}</ul>
    </>
}

export default DriversInfo