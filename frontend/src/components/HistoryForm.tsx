import { FormEvent, useState } from "react"


const HistoryForm: React.FC = () => {
    const [userId, setUserId] = useState<string>("")
    const [driver, setDriver] = useState<string>("")


    return <form>
        <label htmlFor="userId">User id:</label>
        <input type="text" id="userId" />
        <select
            name="drivers"
            id="drivers-select"
            value={driver}
            onChange={(e: FormEvent<HTMLSelectElement>) => setDriver(e.currentTarget.value)}
        >
            <option value="">Select a Driver</option>
            <option value="1">Homer Simpson</option>
            <option value="2">Dominic Toretto</option>
            <option value="3">James Bond</option>
        </select>
        <button>Filter</button>
    </form>
}

export default HistoryForm