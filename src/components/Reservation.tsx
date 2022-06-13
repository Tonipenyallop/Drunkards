import React, {useState, useEffect, ReactElement} from 'react'
import axios from 'axios'


export default function Reservation() {

    const [reservations, setReservations] = useState<any>()
    const [latestReservation, setLatestReservation] = useState<any>()
    const sessionToken = window.localStorage.getItem("sessionToken");

    async function getReservation(){
        const getReservationRequest = await axios.post("http://localhost:8080/get_reservation", {sessionToken})
        console.log(getReservationRequest.data)
        setReservations(getReservationRequest.data)
    }

    async function getLatestReservation(){
        console.log('latest request');
        const latestReservationRequest = await axios.post("http://localhost:8080/latest_reservation", {sessionToken})
        console.log(latestReservationRequest.data)
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
            <button onClick={getLatestReservation}>Get Latest Reservation</button>

            </div>
        </div>
    )
}
