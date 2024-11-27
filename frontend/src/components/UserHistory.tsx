import { FormEvent, useState } from "react"
import HistoryForm from "./HistoryForm"
import { Ride } from "../models/Ride"
import RideInfo from "./RideInfo"


const UserHistory: React.FC = () => {
    const [registeredUserId, setRegisteredUserId] = useState<string>("")
    const [driver, setDriver] = useState<string>("")
    const [rides, setRides] = useState<Ride[]>([])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (driver) {
            const rawData = await fetch(`http://localhost:8080/ride/${registeredUserId}?driver_id=${driver}`)
            const userRidesRegister = await rawData.json()
            setRides(userRidesRegister.rides)
        } else {
            const rawData = await fetch(`http://localhost:8080/ride/${registeredUserId}`)
            const userRidesRegister = await rawData.json()
            setRides(userRidesRegister.rides)
        }
    }

    return <div>
        <HistoryForm
            registeredUserId={registeredUserId}
            driver={driver}
            setRegisteredUserId={setRegisteredUserId}
            setDriver={setDriver}
            onSubmit={handleSubmit}
        />
        <ul>{rides.map(ride => <li key={ride.id}><RideInfo ride={ride} /></li>)}</ul>
    </div>
}

export default UserHistory