import  { Application, Request, Response, NextFunction } from "express";
import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "../proto/index";
// import { LoginResponse } from "../proto/index_pb";
import { LoginResponse as LoginResponseType } from "../proto/index/LoginResponse";
import { randomUUID } from "crypto";
import {v4 as uuidv4} from 'uuid';
import { convertCompilerOptionsFromJson } from "typescript";
import { Exceptions } from "../proto/index/Exceptions";
import { timeStamp } from "console";
import { CreateReservationRequest } from "../proto/index/CreateReservationRequest";
import { Timestamp } from '../proto/google/protobuf/Timestamp';

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
    client.Login({
        username: req.body.username, 
        password: req.body.password
    }, (err, result) => {
        if (err) {
            console.log(`ERROR: ${JSON.stringify(err)}`);
        } else {
            console.log(`result: ${JSON.stringify(result)}`);
            res.send({sessionToken : result})
        }
        });

} );

app.post("/register", async (req: Request, res: Response)=> {
    client.Register({username: req.body.username, password :req.body.password}, (err,result) => {
        if(err){
            console.log(`ERROR : ${err}`)
            res.send({err})
        } else {
            console.log(`result: ${JSON.stringify(result)}`)
            res.send({sessionToken : result})
        }

    })
    
                
    

});

app.post("/get_reservation", async (req:Request, res: Response) => {
    console.log("req")
    console.log(req.body)
    await client.GetReservation({ sessionToken :req.body.sessionToken}, (err, result)=> {


    })
    const userIdArray = await database.select("userId").from("sessions").where("sessionToken", req.body.sessionToken);

    const allReservations = await database.select("*").from("requests").where("userId",userIdArray[0].userId )
    console.log(allReservations)
    res.status(200).send({allReservations})
} )

app.post("/reservation", async (req:Request, res: Response) => {
    console.log(req.body)
    if (req.body.sessionToken === null) return res.send({Error : Exceptions.INVALID_INPUT_EXCEPTION})
        let sessionToken;
    try{
        sessionToken = JSON.parse(req.body.sessionToken).sessionToken
    } catch (err) {
        return res.send({err})
    }
        console.log(`pickupTime ${req.body.pickupTime}`)
        console.log(`startLocation ${req.body.startLocation}`)
        console.log(`destination ${req.body.destination}`)
        console.log(`sessionToken ${sessionToken}`)
        // const date = new Date(req.body.pickupTime)
        const creationDate = new Date(req.body.pickupTime);
        console.log(`creationDate : ${creationDate.getSeconds()}`)
        

        const request : CreateReservationRequest = {
            startLocation : req.body.startLocation,
            destination : req.body.destination,
            pickupTime :  {seconds : creationDate.getTime() / 1000} as Timestamp,
            sessionToken : req.body.sessionToken
        }

        console.log("request.pickupTime")
        console.log(request.pickupTime)
        
        await client.CreateReservation( request,   async (err , result) => {
            // somehow it is throwing the error
            if(err){
                res.send({err})

            }
            else{
                console.log(result)
                  res.send("OKIDOKI")
                }

            // fix here later
            // console.log("successfully request the car")
        })




    
})

app.post("/latest_reservation", async (req:Request, res: Response) => {
    client.GetLatestReservation({sessionToken : req.body.sessionToken}, (err, result) => {

    })
    const userIdArray = await database.select("userId").from("sessions").where("sessionToken", req.body.sessionToken);
    const requestHistory = await database.select("*").from("requests").where("userId", userIdArray[0].userId )
    console.log("requestHistory")
    const latestReservation = requestHistory[requestHistory.length - 1];
    console.log(latestReservation)
    res.send({latestReservation})

})

app.post("/cancel",async (req:Request, res: Response) => {
    await client.CancelReservation({sessionToken : req.body.sessionToken}, (err, result) => {

    })
})


app.listen( expressPORT, () => {
    console.log(`server started at http://localhost:${ expressPORT }` );
} );



// function toDate(timestamp: Timestamp): Date {
//     return new Date(timestamp.getSeconds()*1000 + timestamp.getNanos()/1e6);
// }
