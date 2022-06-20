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
  const [minimumConstraints, setMinimumConstraints ] = useState<string>("");
  
  useEffect(()=> {
    if(isAfterRequest){
      const interval = setInterval(()=> {   
        refreshArrivalTime();
        if(estimatedArrivalTime <= 0){
          // is_deleted to be true when a car arrive 
          getCancelRequest();
          clearInterval(interval)
        }
        // update every minutes 60000
      }, 1000)
      
      return () => {
        clearInterval(interval)
      }
    }
  }, [isAfterRequest,estimatedArrivalTime])

  async function getArrivalTime(){
      // 1. send the request to get the time 
      console.log(`get arrival time is called`)
      const sessionToken = window.localStorage.getItem("sessionToken")
      const arrivalTimeRequest = await axios.post("http://localhost:8080/get_arrival_time", {sessionToken})
      console.log(arrivalTimeRequest.data)

      setEstimatedArrivalTime(arrivalTimeRequest.data.arrivalMinutes)
      
      // 2. return to time with minutes
  }


  async function getCancelRequest() {
    const sessionToken = window.localStorage.getItem("sessionToken");
    await axios.post("http://localhost:8080/cancel", {sessionToken});
  } 
  

  async function getReservationRequest(){
    try {
      const token  = window.localStorage.getItem("sessionToken")

      const reservationRequest = await axios.post("http://localhost:8080/reservation", {startLocation, destination, pickupTime, sessionToken: token})

      if(reservationRequest.status === 200) {
        setIsRequestCar(true)
        // getCarArrivingTime();
        setIsAfterRequest(true);
        await getArrivalTime()
        
      } 
    }
    catch (err){
      console.log(err, null, 2)
      // if user is unauthorized, send back to user page
      // navigate("/")
      
    }
      // else if(reservationRequest.status === 401) {
      //   navigate("/")
      // }else console.log("else here")

  }

  async function refreshArrivalTime(){
    if(isAfterRequest && estimatedArrivalTime > 0){
      const sessionToken = window.localStorage.getItem("sessionToken");
      const refreshArrivalTimeRequest = await axios.post("/update_arrival_time", {sessionToken})
      const { minute } = refreshArrivalTimeRequest.data
      console.log(estimatedArrivalTime, minute)
      setEstimatedArrivalTime(estimatedArrivalTime + minute)
    }
}



  // async function getCarArrivingTime(): Promise<void>{
  //   const carArrivingTimeRequest = await axios.get("http://localhost:8080/arriving_time")
  //   const estimatedArrivalTime = carArrivingTimeRequest.data.estimatedArrivalTime


  //   const responseMinutes = new Date(estimatedArrivalTime).getMinutes();
  //   const currentMinutes = new Date(new Date().getTime()).getMinutes();

  //   const estimatedMinutes = responseMinutes - currentMinutes 


  //   setEstimatedArrivalTime(estimatedMinutes)
  // }


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
