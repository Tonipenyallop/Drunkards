import  { Application, Request, Response, NextFunction } from "express";
import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "../proto/index";
import { LoginResponse } from "../proto/index_pb";
import { LoginResponse as LoginResponseType } from "../proto/index/LoginResponse";
import { randomUUID } from "crypto";
import {v4 as uuidv4} from 'uuid';

const database = require("../db/db")
const express = require("express")
const cors = require("cors")
const app = express();
const expressPORT = 8080; // default expressPORT to listen
const PROTO_PATH = "../proto/index.proto";

app.use(cors());
app.use(
    express.urlencoded({
      extended: true,
    })
  );
app.use(express.json());

const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, PROTO_PATH)
);

const grpcObj = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;

const GRPCPORT = 8882;

const client = new grpcObj.index.User(
  `0.0.0.0:${GRPCPORT}`,
  grpc.credentials.createInsecure()
);


app.post("/login", async( req: Request, res: Response ) => {

    try {
    // const user = await database.select("*").from("users").where("name", req.body.name).andWhere("password", req.body.password)
    // if(user.length === 0) {
    //     res.sendStatus(400) 
    //     return 
    // }

    let response : LoginResponse= new LoginResponse();
        console.log("webserver")
        console.log(req.body)
    await client.Login(
        // { username: user[0].name, password: user[0].password },
        {username: req.body.name, password: req.body.password},
        async(err, result) => {
            if (err) {
                console.log("Error is true")
                console.error(err);
                // return res.send({message : err, status: 400}).status(400)
                return res.status(400).send({message: "Invalid Input"})
                // return;
            }

            console.log('result is printed here?');
            console.log(result);
            // from here
            // just created session token when user successfully login!
            // const sessionToken : string = uuidv4()
            // console.log("sessionToken")
            // console.log(sessionToken)
            // console.log("user")
            // console.log(user[0].id)
            // const temp = response.setSessiontoken(sessionToken)
            // // const a = temp.getSessiontoken();
            // console.log("temp")
            // console.log(temp)
            // await database("sessions").insert({userId: user[0].id, sessionToken })

            // res.send({sessionToken}).status(200)
            res.send("temp")
            // response.sessionToken = sessionToken;
             
        }
        );
    }
    catch (err){
        res.send({message : err})
    }
} );

app.post("/signUp", async (req: Request, res: Response)=> {
    res.send("SIGNUP")
})

app.post("/reservation", async (req:Request, res: Response) => {
    try{
    console.log('reservation was called')
    console.log(req.body.request.sessionToken)
    const temp = await database.select("*").from("sessions").where("sessionToken",req.body.request.sessionToken )
    console.log("temp")
    console.log(temp)
    if(temp.length === 0 ) {
        res.send("Unauthorized user").status(401)
    }

    await client.CreateReservation( {startLocation: req.body.startLocation, destination: req.body.destination, pickupTime: req.body.pickupTime , sessionToken : req.body.request.sessionToken},  async (err , result) => {
        console.log(err)
        console.log(result)

    })

    res.send("OKIDOKI")
    }
    catch (err) {
        res.send({message : err})
    }
})
// start the Express server
app.listen( expressPORT, () => {
    console.log(`server started at http://localhost:${ expressPORT }` );
} );
