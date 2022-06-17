import React, {useState, useEffect, ReactElement} from 'react'
import axios from 'axios'


export default function Reservation({isRequestCar} : any) {

    enum CancelRequestState {
        success = "success",
        failed = "failed", 
        notChangedYet = "notChangedYet"
    }
    const [reservations, setReservations] = useState<any>()
    const [latestReservation, setLatestReservation] = useState<any>()
    const [isSuccessCancel, setIsSuccessCancel] = useState<CancelRequestState>(CancelRequestState.notChangedYet)
    // const [isRequestCar, setIsRequestCar] = useState<boolean>(false)
    const sessionToken = window.localStorage.getItem("sessionToken");


    async function getReservation(){
        const getReservationRequest = await axios.post("http://localhost:8080/get_reservation", {sessionToken})
        setReservations(getReservationRequest.data);
        
    }


    // async function getLatestReservation(){
    //     console.log('latest request');
    //     const latestReservationRequest = await axios.post("http://localhost:8080/latest_reservation", {sessionToken})
    //     console.log(latestReservationRequest.data)
    //     // if(latestReservation.data) {
    //     //     setIsSuccessCancel(false)
    //     // }
    //     // else setIsSuccessCancel(true)

    // }
    
     async function cancelReservation(){
        const cancelReservationRequest = await axios.post("http://localhost:8080/cancel", {sessionToken})
        console.log(cancelReservationRequest.data)
        // fix here
        if(cancelReservationRequest?.data === "success") {
            setIsSuccessCancel(CancelRequestState.success)
        }
        else setIsSuccessCancel(CancelRequestState.failed)

    }



    function convertTime(timeStamp : number): Date{
        return new Date(timeStamp * 1000);
    }
   
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
           
            {/* <button onClick={getLatestReservation}>Get Latest Reservation</button> */}
            <button onClick={cancelReservation}>Cancel Reservation</button>
            {isSuccessCancel === CancelRequestState.success ? <div>Successfully cancel</div> : isSuccessCancel === CancelRequestState.failed ? <div>Failed to cancel</div> : <div></div>}
            {isRequestCar === true ? <div>car on the way</div> : <div></div>}
        </div>
    )
}

