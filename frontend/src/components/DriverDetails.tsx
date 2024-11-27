const DriverDetails: React.FC<{ name: string, rating: number, comment: string, car: string, value: number }> = (props) => {
    return <div>
        <h3>{props.name}</h3>
        <p><strong>{props.rating}</strong>/5 - {props.comment}</p>
        <p>{props.car}</p>
        <p>R$ {props.value}</p>
        <button>Confirm Ride</button>
    </div>
}

export default DriverDetails