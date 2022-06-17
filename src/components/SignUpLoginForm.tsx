import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUpLogInForm() {
  enum RegisterResponse {
    success = "success",
    fail = "fail",
    yetToChanged = "yetToChanged",
  }

  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [phoneOrEmail, setPhoneOrEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [loginPhoneOrEmail, setLoginPhoneOrEmail] = useState<string>("");
  const [isSuccessRegister, setIsSuccessRegister] = useState<RegisterResponse>(
    RegisterResponse.yetToChanged
  );

  async function requestLogin() {
    const response = await axios.post("http://localhost:8080/login", {
      username: loginPhoneOrEmail,
      password: loginPassword,
    });
    if (response.status === 200) {
      window.localStorage.setItem(
        "sessionToken",
        JSON.stringify(response.data.sessionToken)
      );
      navigate("/user");
    }
  }

  async function register() {
    const registerRequest = await axios.post("http://localhost:8080/register", {
      username: phoneOrEmail,
      password,
    });
    console.log(registerRequest.statusText);

    // console.log(registerRequest.data);
    if (registerRequest.status === 200) {
      setIsSuccessRegister(RegisterResponse.success);
    } else {
      console.log("come ther");
      // setIsSuccessRegister(RegisterResponse.fail);

      setIsSuccessRegister(RegisterResponse.fail);
    }
  }

  return (
    <div>
      <div className="">
        LOGIN
        <br />
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
      <br />
      <div className="">
        REGISTER ACCOUNT
        <br />
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
        <button onClick={() => register()}>SIGN UP</button>
        {isSuccessRegister === RegisterResponse.success ? (
          <div>Successfully Register</div>
        ) : isSuccessRegister === RegisterResponse.fail ? (
          <div>Fail to Register</div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
