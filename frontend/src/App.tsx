import { useReducer } from 'react'
import DriversInfo from './components/DriversInfo'
import Form from './components/Form'
import { rideReducer } from './reducers/rideReducer'
import { rideInitialState } from './reducers/rideInitialState'



function App() {

  const [rideState, dispatchRide] = useReducer(rideReducer, rideInitialState)

  return (
    <div>
      <Form dispatchRide={dispatchRide} />
      <DriversInfo drivers={rideState.drivers} />
    </div>
  )
}

export default App
