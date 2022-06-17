import React, { useState, useEffect } from "react";
import axios from "axios"
import Reservation from "./Reservation";
export default function UserPage() {

  const [startLocation, setStartLocation] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [pickupTime, setPickupTime] = useState<string>();
  const [isRequestCar,setIsRequestCar] = useState<boolean>(false)
  const [estimatedArrivalTime, setEstimatedArrivalTime ] = useState<number>(0);
  const [isAfterRequest, setIsAfterRequest] = useState<boolean>(false);

  
  useEffect(()=> {
      const interval = setInterval(()=> {
        getArrivalTime()  
        refreshArrivalTime();
          if(estimatedArrivalTime <= 0){
            getCancelRequest();
            clearInterval(interval)
            }
            // update every minutes
      },60000)

      return () => {
          clearInterval(interval)
      }

  }, [isAfterRequest,estimatedArrivalTime])

  async function getArrivalTime(){
      // 1. send the request to get the time 
      const sessionToken = window.localStorage.getItem("sessionToken")
      await axios.post("http://localhost:8080/get_arrival_time", {sessionToken})
      // 2. return to time with minutes
  }


  async function getCancelRequest() {
    const sessionToken = window.localStorage.getItem("sessionToken");
    await axios.post("http://localhost:8080/cancel", {sessionToken});
  } 
  

  async function getReservationRequest(){
      const token  = window.localStorage.getItem("sessionToken")
      const reservationRequest = await axios.post("http://localhost:8080/reservation", {startLocation, destination, pickupTime, sessionToken: token} )
      if(reservationRequest.status === 200) {
        setIsRequestCar(true)
        getCarArrivingTime();
        setIsAfterRequest(true);
      }
  }

  function refreshArrivalTime(){
    if(isAfterRequest && estimatedArrivalTime > 0){
      const max = 1
      const min = -1
      const randomDelay = Math.floor(Math.random() *(max - min + 1) + min);
      // preventing ETA to be negative value
      if(estimatedArrivalTime + randomDelay - 1 < 0) setEstimatedArrivalTime(0)
      else setEstimatedArrivalTime(estimatedArrivalTime + randomDelay - 1)
    }
}

  async function getCarArrivingTime(): Promise<void>{
    const carArrivingTimeRequest = await axios.get("http://localhost:8080/arriving_time")
    const estimatedArrivalTime = carArrivingTimeRequest.data.estimatedArrivalTime


    const responseMinutes = new Date(estimatedArrivalTime).getMinutes();
    const currentMinutes = new Date(new Date().getTime()).getMinutes();

    const estimatedMinutes = responseMinutes - currentMinutes 


    setEstimatedArrivalTime(estimatedMinutes)
  }


  return (
    <div>
      WELCOME USER <br />
      <input type="text" placeholder="From" onChange={(e)=>{
        setStartLocation(e.target.value)
      }} />
      <input type="text" placeholder="To" onChange={(e)=>{
        setDestination(e.target.value)
      }} />
      <input type="datetime-local" placeholder="When" onChange={(e)=>{
        setPickupTime(e.target.value)
      }} />
      <button onClick={getReservationRequest}>Request Car</button>

      <Reservation isRequestCar={isRequestCar} setIsAfterRequest={setIsAfterRequest}/>

      {isAfterRequest ? <div className="">Car will arrive in {estimatedArrivalTime} mins</div> : <div></div> }
    </div>
  );
}
