import axios from "axios";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { UserInfo } from "../proto/index_pb";

import { main } from "../server/login_server";
// console.log(main);
import { UserClient } from "../proto/IndexServiceClientPb";

export default function SignUpLogInForm() {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [phoneOrEmail, setPhoneOrEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [loginPhoneOrEmail, setLoginPhoneOrEmail] = useState<string>("");

  const client = new UserClient("http://localhost:8080", null, null);
  // const client = new UserClient("http://localhost:8080", null);

  async function tempTest() {
    const user = new UserInfo();
    user.setName("toni");
    user.setPassword("secret");
    console.log(user);
    console.log(client.login);
    client.login(user, null, (err, response) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Yeah I got response ${response}`);
    });
    // console.log(a);
    // console.log(user);
  }

  useEffect(() => {
    tempTest();
  }, []);

  async function signUp() {
    console.log("clicked");
    console.log(phoneOrEmail);
    console.log(password);
    const userInfo = {
      phoneOrEmail,
      password,
    };
    const stringifiedInfo = JSON.stringify(userInfo);

    // const response = await axios.post(
    //   "http://localhost:9999/signup",
    //   stringifiedInfo
    // );

    // console.log(response.data);
  }

  async function login() {
    if (!loginPhoneOrEmail || !loginPassword) return;
    console.log("login");
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
        <button onClick={() => login()}>LOGIN</button>
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
