import axios from "axios";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserClient } from "../proto/index_grpc_pb";
// const UserClient = require("../proto/index_grpc_pb");

// import { UserInfo } from "../proto/index/UserInfo";
// import { UserInfo } from "../proto/index_pb";
export default function SignUpLogInForm() {
  const navigate = useNavigate();

  const [password, setPassword] = useState<string>("");
  const [phoneOrEmail, setPhoneOrEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [loginPhoneOrEmail, setLoginPhoneOrEmail] = useState<string>("");

  async function toni() {
    // from here
    // console.log(UserClient);
    // const client = new UserClient("http://localhost:8080", null);
    // console.log(client);
    // const user: UserInfo = { name: "SUPER HAPPY TAESU", password: "2919w02s" };
    // console.log(user);
    // client.login(user, () => {});
  }

  useEffect(() => {
    toni();
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

    // console.log(SuccessLogIn);
    // const newUser: UserInfo = {
    //   name: loginPhoneOrEmail,
    //   password: loginPassword,
    // };
    // console.log(newUser);

    // want to call function here
    // const temp: User = {
    //   Login(request: UserInfo): Promise<SuccessLogIn> {
    //     console.log("inside");
    //     console.log(request);
    //     const fake: SuccessLogIn = { isSuccess: true };

    //     // return fake
    //     return Promise.resolve(fake);
    //   },
    // };
    // const fakeUSer: UserInfo = {
    //   name: "fake user",
    //   password: "fake pass",
    // };
    // const result = temp.Login(newUser);
    // console.log(result);

    // update it with real response
    // const fakeResponse: SuccessLogIn = { isSuccess: false };
    // console.log(fakeResponse);

    // const stringifiedInfo = JSON.stringify(newUser);

    // const response = await axios.post(
    //   "http://localhost:9000/login",
    //   stringifiedInfo
    // );

    // console.log(response.data);
    // navigate("/user");
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
