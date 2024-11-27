import { useRef, FormEvent } from 'react'
import { RideAction } from '../reducers/rideTypes'


const Form: React.FC<{
    dispatchRide: (action: RideAction) => void,
    setCustomerId: (id: string) => void,
    setOrigin: (origin: string) => void,
    setDestination: (destination: string) => void
}> = (props) => {

    const costumerIdInput = useRef<HTMLInputElement>(null)
    const originInput = useRef<HTMLInputElement>(null)
    const destinationInput = useRef<HTMLInputElement>(null)


    const submitHandler = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault()

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

        const data = await response.json()
        console.log(data)

        // props.dispatchRide({ type: 'SET_CUSTOMER_ID', payload: customerId })
        // props.dispatchRide({ type: 'SET_ORIGIN_ADDRESS', payload: origin })
        // props.dispatchRide({ type: 'SET_DESTINATION_ADDRESS', payload: destination })
        props.dispatchRide({ type: 'SET_ORIGIN', payload: { lat: data.origin.latitude, long: data.origin.longitude } })
        props.dispatchRide({ type: 'SET_DESTINATION', payload: { lat: data.destination.latitude, long: data.destination.longitude } })
        props.dispatchRide({ type: 'SET_DISTANCE', payload: data.distance })
        props.dispatchRide({ type: 'SET_DURATION', payload: data.duration })
        props.dispatchRide({ type: 'SET_DRIVERS', payload: data.options })
        props.dispatchRide({ type: 'SET_ROUTE_RESPONSE', payload: data.routeResponse })

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

export default Form