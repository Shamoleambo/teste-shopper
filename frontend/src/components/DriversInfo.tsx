import { Driver } from "../models/Driver"

const DriversInfo: React.FC<{ drivers: Driver[] }> = (props) => {
    return <ul>{props.drivers.map(driver => <li key={driver.id}>
        <div>
            <h3>{driver.name}</h3>
            <p><strong>{driver.review.rating}</strong>/5 - {driver.review.comment}</p>
            <p>{driver.vehicle}</p>
            <p>R$ {driver.value}</p>
        </div>
    </li>)}</ul>
}

export default DriversInfo