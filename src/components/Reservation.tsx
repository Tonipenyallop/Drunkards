import React, {useState, useEffect, ReactElement} from 'react'
import axios from 'axios'


export default function Reservation() {

    const [reservations, setReservations] = useState<any>()
    const [latestReservation, setLatestReservation] = useState<any>()
    const sessionToken = window.localStorage.getItem("sessionToken");

    async function getReservation(){
        const getReservationRequest = await axios.post("http://localhost:8080/get_reservation", {sessionToken})
        setReservations(getReservationRequest.data);
        
    }


    async function getLatestReservation(){
        console.log('latest request');
        const latestReservationRequest = await axios.post("http://localhost:8080/latest_reservation", {sessionToken})
        console.log(latestReservationRequest.data)
    }
    
    async function cancelReservation(){
        const cancelReservationRequest = await axios.post("http://localhost:8080/cancel", {sessionToken})
        console.log(cancelReservationRequest)
    }

    function convertTime(timeStamp : number): Date{
        return new Date(timeStamp * 1000);
    }


    // console.log(reservations?.reservations.map((e:any) => console.log(`e: ${e}`)))
   
    return (
        <div>
            <button onClick={getReservation}>Check All Reservations </button>
            <div className="">
            {reservations?.reservations.map((e:any, idx: number)=> {
                return <div className="" key={`${idx}`}>
                        <div className="">StartLocation:{e.startLocation}</div>
                        <div className="">Destination:{e.destination}</div>
                        <div className="">reservationID: {e.reservationID}</div>
                        <div className="">{`pickup time:${convertTime(e.pickupTime.seconds.low).getFullYear()}-${convertTime(e.pickupTime.seconds.low).getMonth()}-${convertTime(e.pickupTime.seconds.low).getDate()}
                        ${convertTime(e.pickupTime.seconds.low).getHours()}:${convertTime(e.pickupTime.seconds.low).getMinutes()}`
                        }</div>
                        <br />
                </div>
            })}
            </div>
           
            <button onClick={getLatestReservation}>Get Latest Reservation</button>
            <button onClick={cancelReservation}>Cancel Reservation</button>

        </div>
    )
}
