import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {CreateReservationRequest} from "../proto/index/CreateReservationRequest"
import axios from "axios"
import Reservation from "./Reservation";
export default function UserPage() {
  const navigate = useNavigate();

  // enum requestCarResponse {
  //   success =  "success",
  //   fail = "fail",
  //   notRequestedYet = "notRequestedYet"
  // }

  const [startLocation, setStartLocation] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [pickupTime, setPickupTime] = useState<string>();
  const [isRequestCar,setIsRequestCar] = useState<boolean>(false)
  const [estimatedArrivalTime, setEstimatedArrivalTime ] = useState<number>(0);
  const [delayTime, setDelayTime] = useState<number>(0);
  const [isAfterRequest, setIsAfterRequest] = useState<boolean>(false);
  
  const getReservationRequest = async() => {
      const token  = window.localStorage.getItem("sessionToken")
      const reservationRequest = await axios.post("http://localhost:8080/reservation", {startLocation, destination, pickupTime, sessionToken: token} )
      if(reservationRequest.status === 200) {
        setIsRequestCar(true)
        getCarArrivingTime();
        setIsAfterRequest(true);
      }

  }

  async function getCarArrivingTime(): Promise<void>{
    const carArrivingTimeRequest = await axios.get("http://localhost:8080/arriving_time")
    const estimatedArrivalTime = carArrivingTimeRequest.data.estimatedArrivalTime

    // estimated mins
    const responseMinutes = new Date(estimatedArrivalTime).getMinutes();
    const currentMinutes = new Date(new Date().getTime()).getMinutes();
    console.log(new Date(estimatedArrivalTime).getMinutes())
    const estimatedMinutes = responseMinutes- currentMinutes 
    console.log(estimatedMinutes)

    setEstimatedArrivalTime(estimatedMinutes)

    // const estimated =  new Date(estimatedArrivalTime).getHours()
    // const estimatedMinutes =  new Date(estimatedArrivalTime).getMinutes()
    // console.log(estimated, estimatedMinutes)
    // setEstimatedArrivalTime(new Date(estimatedArrivalTime))




    // const currentMinutes = new Date(Date.now()).getMinutes();
    // console.log(estimatedArrivalTime)
    // const randomMinutes = new Date(estimatedArrivalTime)
    // console.log(randomMinutes.getMinutes())
    // setEstimatedArrivalTime(randomMinutes);


  }

  function refreshArrivalTime(){
      const max = 2
      const min = -1
      const randomDelay = Math.floor(Math.random() *(max - min + 1) + min);
      setEstimatedArrivalTime(estimatedArrivalTime + randomDelay - 1)
  }

  if(isAfterRequest && estimatedArrivalTime > 0){
  setTimeout(()=> {
    refreshArrivalTime()
    // every 1mins 60000
  }, 60000 )}

  return (
    <div>
      WELCOME YOO <br />
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

      <Reservation isRequestCar={isRequestCar} setIsRequestCar={setIsRequestCar}/>
      <button onClick={refreshArrivalTime}>Refresh</button>
      {isAfterRequest ? <div className="">Car will arrive in {estimatedArrivalTime} mins</div> : <div></div> }
    </div>
  );
}
