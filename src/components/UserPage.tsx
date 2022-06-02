import React from "react";
import { useNavigate } from "react-router-dom";
export default function UserPage() {
  const navigate = useNavigate();
  return (
    <div>
      WELCOME YOO
      <button className="" onClick={() => navigate("/detail")}>
        Fake companyA
      </button>
    </div>
  );
}
