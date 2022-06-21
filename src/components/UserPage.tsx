import React, { useState, useEffect } from "react";
import axios from "axios"
import Reservation from "./Reservation";
import { useNavigate } from "react-router";
export default function UserPage() {
  const navigate = useNavigate();
  const [startLocation, setStartLocation] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [pickupTime, setPickupTime] = useState<string>();
  const [isRequestCar,setIsRequestCar] = useState<boolean>(false)
  const [estimatedArrivalTime, setEstimatedArrivalTime ] = useState<number>(0);
  const [isAfterRequest, setIsAfterRequest] = useState<boolean>(false);
  
  useEffect(()=> {
    if(isAfterRequest){
      const interval = setInterval(()=> {   
        refreshArrivalTime();
        if(estimatedArrivalTime <= 0){
          // is_deleted to be true when a car arrive 
          getCancelRequest();
          clearInterval(interval)
        }
        // update every minutes
      }, 60000)
      
      return () => {
        clearInterval(interval)
      }
    }
  }, [isAfterRequest, estimatedArrivalTime])

  async function getArrivalTime(){

      const sessionToken = window.localStorage.getItem("sessionToken")
      const arrivalTimeRequest = await axios.post("http://localhost:8080/get_arrival_time", {sessionToken})

      setEstimatedArrivalTime(arrivalTimeRequest.data.arrivalMinutes)
      
  }


  async function getCancelRequest() {
    try {

      const sessionToken = window.localStorage.getItem("sessionToken");
      await axios.post("http://localhost:8080/cancel", {sessionToken});
    } 
    catch(err: any) {
        console.log(err)
    }
  } 
  

  async function getReservationRequest(){
    try{
      const sessionToken  = window.localStorage.getItem("sessionToken")
      const reservationRequest = await axios.post("http://localhost:8080/reservation", {startLocation, destination, pickupTime, sessionToken})
      
      if(reservationRequest.status === 200) {
        setIsRequestCar(true)
        setIsAfterRequest(true);
        // window.localStorage.setItem("isAfterRequest", "true");
        await getArrivalTime()
        // updateSessionToken()
      } 
    } catch(err: any) {
      if(err.response.status === 401) navigate("/")
      else console.error(err)
    }
  }

  async function refreshArrivalTime(){
    if(isAfterRequest && estimatedArrivalTime > 0){
      const sessionToken = window.localStorage.getItem("sessionToken");
      const refreshArrivalTimeRequest = await axios.post("/update_arrival_time", {sessionToken})
      const { minute } = refreshArrivalTimeRequest.data
      setEstimatedArrivalTime(estimatedArrivalTime + minute)
    }
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

      {/* disable past date:=> min={new Date().toISOString().split(".")[0]} */}
      <input type="datetime-local" placeholder="When"  onChange={(e)=>{
        setPickupTime(e.target.value)
      }} />
      <button onClick={getReservationRequest}>Request Car</button>

      <Reservation isRequestCar={isRequestCar} setIsAfterRequest={setIsAfterRequest}/>

      {isAfterRequest ? <div className="">Car will arrive in {estimatedArrivalTime} mins</div> : <div></div> }

    </div>
  );
}
