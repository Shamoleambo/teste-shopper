import { FormEvent, useState } from "react"
import HistoryForm from "./HistoryForm"


const UserHistory: React.FC = () => {
    const [registeredUserId, setRegisteredUserId] = useState<string>("")
    const [driver, setDriver] = useState<string>("")

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (driver) {
            const rawData = await fetch(`http://localhost:8080/ride/${registeredUserId}?driver_id=${driver}`)
            const userRidesRegister = await rawData.json()
            console.log(userRidesRegister)
        } else {
            const rawData = await fetch(`http://localhost:8080/ride/${registeredUserId}`)
            const userRidesRegister = await rawData.json()
            console.log(userRidesRegister)
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
    </div>
}

export default UserHistory