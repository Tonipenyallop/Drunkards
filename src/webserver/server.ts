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
            // return res.status(400).send({message: `Invalid Input: ${err}`})
        } else {
            // result is not printed out 
            console.log(`result: ${JSON.stringify(result)}`);
            res.send({sessionToken : result})
        }

        
           
           
            // just created session token when user successfully login!
            // const sessionToken : string = uuidv4()
            // const user = await database
            // .select("*")
            // .from("users")
            // .where("username", req.body.username)
            // .andWhere("password", req.body.password);

            // await database("sessions").insert({userId: user[0].id, sessionToken })

            // res.status(200).send({sessionToken, user: result})
             
        });

} );

app.post("/signUp", async (req: Request, res: Response)=> {
    try {
        console.log(req.body)
        await client.Register({username: req.body.username, password :req.body.password}, async(err, result) => {
            console.log("inside the sign up form")
        })

        // let myVar: Exceptions = {
        //     invalidInput : "input is wrong"
        // }
        let myExceptionType = Exceptions.INVALID_INPUT_EXCEPTION;

        // ...

        if (myExceptionType === Exceptions.INVALID_INPUT_EXCEPTION) {
            // handle invalid input
        }

        res.send("SIGNUP")
    }
    catch (err) {
        res.send({message : err})

    }
})

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
    try{
        console.log("req.body.pickupTime")
        console.log(req.body.pickupTime)
        await client.CreateReservation( {startLocation: req.body.startLocation, destination: req.body.destination, pickupTime: req.body.pickupTime , sessionToken : req.body.request.sessionToken},   async (err , result) => {

            if(err){
                return res.status(400).send({message: err})
            }
            // fix here later
            console.log("successfully request the car")
        })

    res.send("OKIDOKI")
    }
    catch (err) {
        res.send({message : err})
    }
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
