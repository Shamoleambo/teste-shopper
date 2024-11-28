import { useReducer, useState } from 'react'
import DriversInfo from './components/DriversInfo'
import RideForm from './components/RideForm'
import { rideReducer } from './reducers/rideReducer'
import { rideInitialState } from './reducers/rideInitialState'
import { RideConfirmationBody } from './models/RideConfirmationBody'
import UserHistory from './components/UserHistory'
import ErrorModal from './modal/ErrorModal'



function App() {

  const [rideState, dispatchRide] = useReducer(rideReducer, rideInitialState)
  const [customerId, setCustomerId] = useState("")
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [error, setError] = useState<string>('')

  const handleRideConfirmation = async (body: RideConfirmationBody): Promise<void> => {
    body.customer_id = customerId
    body.origin = origin
    body.destination = destination

    const responseRaw = await fetch('http://localhost:8080/ride/confirm', {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const response = await responseRaw.json()
  }

  return (
    <div>
      <RideForm
        dispatchRide={dispatchRide}
        setCustomerId={setCustomerId}
        setOrigin={setOrigin}
        setDestination={setDestination}
        setError={setError}
      />
      <DriversInfo
        drivers={rideState.drivers}
        rideState={rideState}
        onConfirmDriver={handleRideConfirmation}
      />
      <UserHistory />
      {error && <ErrorModal onClose={() => setError('')}>
        <h3>{error}</h3>
      </ErrorModal>}
    </div>
  )
}

export default App
