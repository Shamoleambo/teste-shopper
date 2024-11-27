import { useRef } from 'react'
import './App.css'

function App() {
  console.log('meu caro amigo')

  const userIdInputRef = useRef<HTMLInputElement>(null)
  const originInputRef = useRef<HTMLInputElement>(null)
  const destinationInputRef = useRef<HTMLInputElement>(null)

  const submitHandler = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()

    const response = await fetch('http://localhost:8080/ride/estimate', {
      method: 'POST',
      body: JSON.stringify({
        customer_id: userIdInputRef.current?.value,
        origin: originInputRef.current?.value,
        destination: destinationInputRef.current?.value
      })
    })

    const data = await response.json()
    console.log(data)

  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className='input-wrapper'>
          <label htmlFor='userId'>User Id:</label>
          <input type='number' id='userId' ref={userIdInputRef} />
        </div>
        <div className='input-wrapper'>
          <label htmlFor='originAddress'>Origin Address:</label>
          <input type='text' id='originAddress' ref={originInputRef} />
        </div>
        <div className='input-wrapper'>
          <label htmlFor='destinationAddress'>Destination Address:</label>
          <input type='text' id='destinationAddress' ref={destinationInputRef} />
        </div>
        <button type='submit'>Estimate Ride</button>
      </form>
    </div>
  )
}

export default App
