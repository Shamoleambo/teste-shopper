import './App.css'

function App() {

  const submitHandler = (event: React.FormEvent): void => {
    event.preventDefault()
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className='input-wrapper'>
          <label htmlFor='userId'>User Id:</label>
          <input type='number' id='userId' />
        </div>
        <div className='input-wrapper'>
          <label htmlFor='originAddress'>Origin Address:</label>
          <input type='text' id='originAddress' />
        </div>
        <div className='input-wrapper'>
          <label htmlFor='destinationAddress'>Destination Address:</label>
          <input type='text' id='destinationAddress' />
        </div>
        <button type='submit'>Estimate Ride</button>
      </form>
    </div>
  )
}

export default App
