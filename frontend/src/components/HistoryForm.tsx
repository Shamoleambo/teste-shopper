import { FormEvent } from "react"

const HistoryForm: React.FC<{
    registeredUserId: string,
    driver: string,
    setRegisteredUserId: (id: string) => void,
    setDriver: (id: string) => void,
    onSubmit: (e: FormEvent) => Promise<void>
}> = (props) => {
    return <form className="form history-form" onSubmit={props.onSubmit}>
        <div className="input-wrapper">
            <label htmlFor="userId">User id:</label>
            <input
                type="text"
                id="userId"
                value={props.registeredUserId}
                onChange={(e: FormEvent<HTMLInputElement>) => props.setRegisteredUserId(e.currentTarget.value)}
            />
        </div>
        <select
            name="drivers"
            id="drivers-select"
            value={props.driver}
            onChange={(e: FormEvent<HTMLSelectElement>) => props.setDriver(e.currentTarget.value)}
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