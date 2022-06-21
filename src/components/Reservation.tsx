import React, {useState, useEffect, ReactElement} from 'react'
import axios from 'axios'
import {useNavigate} from "react-router-dom"


export default function Reservation({isRequestCar, setIsAfterRequest} : any) {
    enum CancelRequestState {
        success = "success",
        failed = "failed", 
        notChangedYet = "notChangedYet"
    }
    const navigate = useNavigate();
    const [reservations, setReservations] = useState<any>()
    const [latestReservation, setLatestReservation] = useState<any>()
    const [isSuccessCancel, setIsSuccessCancel] = useState<CancelRequestState>(CancelRequestState.notChangedYet)



    async function getReservation(){
        try {
            const sessionToken = window.localStorage.getItem("sessionToken");
            const getReservationRequest = await axios.post("http://localhost:8080/get_reservation", {sessionToken})
            console.log(getReservationRequest.request)
            console.log(getReservationRequest.status)
            if(getReservationRequest.status === 200) setReservations(getReservationRequest.data);
        }
        catch (err: any){
            // console.log(err.response.status)
            if(err.response.status === 401) navigate("/")
        }

        
    }
    
     async function cancelReservation(){
        try {
            const sessionToken = window.localStorage.getItem("sessionToken");
            const cancelReservationRequest = await axios.post("http://localhost:8080/cancel", {sessionToken})
            
            if(cancelReservationRequest.status === 200) {
                setIsAfterRequest(false)
                setIsSuccessCancel(CancelRequestState.success)   
            }
        } 
        catch (err: any) {
            console.log(err.response.status)
            if(err.response.status === 401){
                navigate("/")
            }
            setIsSuccessCancel(CancelRequestState.failed)
        }

    }



    function convertTime(timeStamp : number): Date{
        return new Date(timeStamp * 1000);
    }
   
    return (
        <div>
            <button onClick={getReservation}>Check All Reservations </button>
            <div className="">
            {reservations?.reservations?.map((e:any, idx: number)=> {
                return <div className="" key={`${idx}`}>
                        <div className="">StartLocation:{e.startLocation}</div>
                        <div className="">Destination:{e.destination}</div>
                        <div className="">ReservationID: {e.reservationID}</div>
                        <div className="">{`Pickup time:${convertTime(e.pickupTime.seconds.low).getFullYear()}-${convertTime(e.pickupTime.seconds.low).getMonth()}-${convertTime(e.pickupTime.seconds.low).getDate()}
                        ${convertTime(e.pickupTime.seconds.low).getHours()}:${convertTime(e.pickupTime.seconds.low).getMinutes()}`
                        }</div>
                        <br />
                </div>
            })}
            </div>
           
            {/* <button onClick={getLatestReservation}>Get Latest Reservation</button> */}
            <button onClick={cancelReservation}>Cancel Reservation</button>
            {isSuccessCancel === CancelRequestState.success ? <div>Successfully cancel</div> : isSuccessCancel === CancelRequestState.failed ? <div>Failed to cancel</div> : <div></div>}
            {/* {isRequestCar === true ? <div>Car on the way</div> : <div></div>} */}
        </div>
    )
}

