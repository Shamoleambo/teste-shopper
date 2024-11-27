import { useState } from 'react'
import './App.css'
import DriversInfo from './components/DriversInfo'
import Form from './components/Form'
import { Driver } from './models/Driver'

function App() {
  const [drivers, setDrivers] = useState<Driver[]>([])

  return (
    <div>
      <Form setDrivers={setDrivers} />
      <DriversInfo drivers={drivers} />
    </div>
  )
}

export default App
