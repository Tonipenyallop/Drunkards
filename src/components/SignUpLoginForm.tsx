import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "../proto/index";

export default function SignUpLogInForm() {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [phoneOrEmail, setPhoneOrEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [loginPhoneOrEmail, setLoginPhoneOrEmail] = useState<string>("");

  async function requestLogin() {
    const response = await axios.post("http://localhost:8080/login", {
      name: loginPhoneOrEmail,
      password: loginPassword,
    });
    console.log(response.data);
    window.localStorage.setItem("sessionToken", response.data.sessionToken);
    if (response.status === 200) navigate("/user");
  }

  async function signUp() {
    console.log("clicked");
    console.log(phoneOrEmail);
    console.log(password);
    const userInfo = {
      phoneOrEmail,
      password,
    };

    const stringifiedInfo = JSON.stringify(userInfo);
  }

  return (
    <div>
      <div className="">
        LOGIN MATE
        <input
          type="text"
          placeholder="Phone Or Email"
          onChange={(e) => setLoginPhoneOrEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button onClick={() => requestLogin()}>LOGIN</button>
      </div>

      <div className="">
        SIGN UP MATE
        <input
          id="phone_email"
          type="text"
          placeholder="Phone Or Email"
          onChange={(e) => setPhoneOrEmail(e.target.value)}
        />
        <input
          id="password"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => signUp()}>SIGN UP</button>
      </div>
    </div>
  );
}
