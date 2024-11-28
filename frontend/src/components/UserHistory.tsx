import { FormEvent, useState } from "react"
import HistoryForm from "./HistoryForm"
import { Ride } from "../models/Ride"
import RideInfo from "./RideInfo"


const UserHistory: React.FC<{ setError: (msg: string) => void }> = ({ setError }) => {
    const [registeredUserId, setRegisteredUserId] = useState<string>("")
    const [driver, setDriver] = useState<string>("")
    const [rides, setRides] = useState<Ride[]>([])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (driver) {
            let responseData
            try {
                const response = await fetch(`http://localhost:8080/ride/${registeredUserId}?driver_id=${driver}`)
                responseData = await response.json()
                if (!responseData.ok) {
                    throw new Error(responseData.error_description)
                }
            } catch (error) {
                const err = error as Error
                setError(err.message)
            }

            if (responseData.rides) setRides(responseData.rides)
        } else {
            let responseData
            try {
                const response = await fetch(`http://localhost:8080/ride/${registeredUserId}`)
                responseData = await response.json()
                if (!responseData.ok) {
                    throw new Error(responseData.error_description)
                }
            } catch (error) {
                const err = error as Error
                setError(err.message)
            }

            if (responseData.rides) setRides(responseData.rides)
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