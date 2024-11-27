import { useState, FormEvent } from 'react'
import { RideAction, RideState } from '../reducers/rideTypes'


const Form: React.FC<{ state: RideState, dispatch: (action: RideAction) => void }> = (props) => {
    const [customerId, setCustomerId] = useState("")
    const [origin, setOrigin] = useState("")
    const [destination, setDestination] = useState("")


    const submitHandler = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault()

        const response = await fetch('http://localhost:8080/ride/estimate', {
            method: 'POST',
            body: JSON.stringify({
                customer_id: customerId,
                origin: origin,
                destination: destination
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()

        props.dispatch({ type: 'SET_CUSTOMER_ID', payload: customerId })
        props.dispatch({ type: 'SET_ORIGIN_ADDRESS', payload: origin })
        props.dispatch({ type: 'SET_DESTINATION_ADDRESS', payload: destination })
        props.dispatch({ type: 'SET_ORIGIN', payload: { lat: data.origin.latitude, long: data.origin.longitude } })
        props.dispatch({ type: 'SET_DESTINATION', payload: { lat: data.destination.latitude, long: data.destination.longitude } })
        props.dispatch({ type: 'SET_DISTANCE', payload: data.distance })
        props.dispatch({ type: 'SET_DURATION', payload: data.duration })
        props.dispatch({ type: 'SET_DRIVERS', payload: data.options })
        props.dispatch({ type: 'SET_ROUTE_RESPONSE', payload: data.routeResponse })

    }
    return <form onSubmit={submitHandler}>
        <div className='input-wrapper'>
            <label htmlFor='userId'>User Id:</label>
            <input
                type='number'
                id='userId'
                onChange={(e: FormEvent<HTMLInputElement>) => setCustomerId(e.currentTarget.value)}
            />
        </div>
        <div className='input-wrapper'>
            <label htmlFor='originAddress'>Origin Address:</label>
            <input
                type='text'
                id='originAddress'
                onChange={(e: FormEvent<HTMLInputElement>) => setOrigin(e.currentTarget.value)}
            />
        </div>
        <div className='input-wrapper'>
            <label htmlFor='destinationAddress'>Destination Address:</label>
            <input
                type='text'
                id='destinationAddress'
                onChange={(e: FormEvent<HTMLInputElement>) => setDestination(e.currentTarget.value)}
            />
        </div>
        <button type='submit'>Estimate Ride</button>
    </form>
}

export default Form