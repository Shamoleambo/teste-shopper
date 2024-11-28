import { useRef, FormEvent } from 'react'
import { RideAction } from '../reducers/rideTypes'


const RideForm: React.FC<{
    dispatchRide: (action: RideAction) => void,
    setCustomerId: (id: string) => void,
    setOrigin: (origin: string) => void,
    setDestination: (destination: string) => void,
    setError: (error: string) => void
}> = (props) => {

    const costumerIdInput = useRef<HTMLInputElement>(null)
    const originInput = useRef<HTMLInputElement>(null)
    const destinationInput = useRef<HTMLInputElement>(null)


    const submitHandler = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault()
        let responseData

        try {
            const response = await fetch('http://localhost:8080/ride/estimate', {
                method: 'POST',
                body: JSON.stringify({
                    customer_id: costumerIdInput.current?.value,
                    origin: originInput.current?.value,
                    destination: destinationInput.current?.value
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            responseData = await response.json()
            if (!responseData.ok) {
                throw new Error(responseData.error_description)
            }


        } catch (error) {
            const err = error as Error
            props.setError(err.message)
        }

        props.dispatchRide({ type: 'SET_ORIGIN', payload: { lat: responseData.origin.latitude, long: responseData.origin.longitude } })
        props.dispatchRide({ type: 'SET_DESTINATION', payload: { lat: responseData.destination.latitude, long: responseData.destination.longitude } })
        props.dispatchRide({ type: 'SET_DISTANCE', payload: responseData.distance })
        props.dispatchRide({ type: 'SET_DURATION', payload: responseData.duration })
        props.dispatchRide({ type: 'SET_DRIVERS', payload: responseData.options })
        props.dispatchRide({ type: 'SET_ROUTE_RESPONSE', payload: responseData.routeResponse })
    }
    return <form onSubmit={submitHandler}>
        <div className='input-wrapper'>
            <label htmlFor='userId'>User Id:</label>
            <input
                type='number'
                id='userId'
                ref={costumerIdInput}
                onChange={(e: FormEvent<HTMLInputElement>) => props.setCustomerId(e.currentTarget.value)}
            />
        </div>
        <div className='input-wrapper'>
            <label htmlFor='originAddress'>Origin Address:</label>
            <input
                type='text'
                id='originAddress'
                ref={originInput}
                onChange={(e: FormEvent<HTMLInputElement>) => props.setOrigin(e.currentTarget.value)}
            />
        </div>
        <div className='input-wrapper'>
            <label htmlFor='destinationAddress'>Destination Address:</label>
            <input
                type='text'
                id='destinationAddress'
                ref={destinationInput}
                onChange={(e: FormEvent<HTMLInputElement>) => props.setDestination(e.currentTarget.value)}
            />
        </div>
        <button type='submit'>Estimate Ride</button>
    </form>
}

export default RideForm