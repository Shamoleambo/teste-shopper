import { Coordinates } from "../models/Coordinates"
import { Driver } from "../models/Driver"
import DriverDetails from "./DriverDetails"

const DriversInfo: React.FC<{ drivers: Driver[], coordinates: Coordinates, polyline: string }> = (props) => {

    return <>
        <ul>{props.drivers.map(driver => (
            <li key={driver.id}>
                <DriverDetails name={driver.name} rating={driver.review.rating} comment={driver.review.comment} car={driver.vehicle} value={driver.value} />
            </li>
        ))}</ul>
    </>
}

export default DriversInfo