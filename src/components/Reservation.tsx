import React, {useState, useEffect} from 'react'
import axios from 'axios'


export default function Reservation() {

    const [reservations, setReservations] = useState<any>()

    async function getReservation(){
        const getReservationRequest = await axios.get("http://localhost:8080/reservation")
        console.log(getReservationRequest.data)
        setReservations(getReservationRequest.data)
    }
    
    
    return (
        <div>
            <button onClick={getReservation}>Check All Reservations </button>
            <div className="">
            {reservations?.["allReservations"].map((e:any, idx:number) => {
                return <div className="" key={`${idx}`}>
                 <div className="">Start Location:{e.start_location}</div>
                 <div className="">Destination: {e.destination}</div>
                 <div className="">Pickup Time:{e.pickupTime}</div>
                 <br />
                </div>
            })}
            </div>
        </div>
    )
}
