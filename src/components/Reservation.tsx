import React, {useState, useEffect, ReactElement} from 'react'
import axios from 'axios'


export default function Reservation() {

    const [reservations, setReservations] = useState<any>()

    async function getReservation(){
        const getReservationRequest = await axios.post("http://localhost:8080/get_reservation", {sessionToken: window.localStorage.getItem("sessionToken")})
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
