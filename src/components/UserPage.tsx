import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {CreateReservationRequest} from "../proto/index/CreateReservationRequest"
import axios from "axios"
import Reservation from "./Reservation";
export default function UserPage() {
  const navigate = useNavigate();
  const [startLocation, setStartLocation] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [pickupTime, setPickupTime] = useState<string>();
  const getReservationRequest = async() => {
      const token  = window.localStorage.getItem("sessionToken")

      await axios.post("http://localhost:8080/reservation", {startLocation, destination, pickupTime, sessionToken: token} )

  }
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

      <Reservation/>
      {/* <button className="" onClick={() => navigate("/detail")}>
        Fake companyA
      </button> */}
    </div>
  );
}
