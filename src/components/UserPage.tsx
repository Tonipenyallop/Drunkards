import React from "react";
import { useNavigate } from "react-router-dom";
export default function UserPage() {
  const navigate = useNavigate();
  const temp = () => {

  }
  return (
    <div>
      WELCOME YOO <br />
      <input type="text" placeholder="From" />
      <input type="text" placeholder="To" />
      <input type="text" placeholder="When" />
      <button onClick={temp}>Search</button>
      {/* <button className="" onClick={() => navigate("/detail")}>
        Fake companyA
      </button> */}
    </div>
  );
}
