import React from "react";
import SignUpLogInForm from "./SignUpLoginForm";
import { Routes, Route } from "react-router-dom";
import UserPage from "./UserPage";
import Detail from "./Detail";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<SignUpLogInForm />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/detail" element={<Detail />} />
        {/* WELCOME */}
        {/* <SignUpLogInForm /> */}
      </Routes>
    </div>
  );
}

export default App;
