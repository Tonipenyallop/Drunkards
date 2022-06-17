import  { Application, Request, Response, NextFunction } from "express";
import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "../proto/index";
import { Exceptions } from "../proto/index/Exceptions";
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
            res.status(400).send({err})
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
            res.status(400).send({err})
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
        console.log(result)
        console.log(err)
        if (err) {
            console.log(`Error thrown: ${JSON.stringify(err)}`);
            return;
        }

        res.send(result);
    })
})

app.post("/reservation", async (req:Request, res: Response) => {
    console.log(req.body)
    if (req.body.sessionToken === null) return res.send({Error : Exceptions.INVALID_INPUT_EXCEPTION})
        let sessionToken;
    try{
        sessionToken = JSON.parse(req.body.sessionToken).sessionToken
    } catch (err) {
        return res.status(400).send({err})
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
            // grpc expects seconds and getTime method returns to milliseconds
            pickupTime :  {seconds : creationDate.getTime() / 1000} as Timestamp,
            sessionToken : req.body.sessionToken
        }

        console.log("request.pickupTime")
        console.log(request.pickupTime)
        
        await client.CreateReservation( request,   async (err , result) => {
            if(err){
                res.status(400).send({err})
            }
            else{
                console.log(result)
                  res.sendStatus(200)
                }
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
        if(err){
            res.status(400).send({err})
        }
        else {
            
            console.log(`result from cancel : ${JSON.stringify(result)}`)
            res.send("success")
        }
    })
})

app.get("/arriving_time", (_:Request, res: Response) => {
    const estimatedArrivalTime : number = estimatedArrivalTimeGenerator();
    res.send({estimatedArrivalTime});
})

app.listen( expressPORT, () => {
    console.log(`server started at http://localhost:${ expressPORT }` );
} );

function estimatedArrivalTimeGenerator(max: number = 10, min: number = 5) : number{
    const randomNumber =  Math.floor(Math.random() * (max - min + 1) + min);
    console.log(`randomNumber: ${randomNumber * 60000}`)
    // times 1000 since convert from milliseconds to minute
    const estimatedArrivalTime = new Date().getTime() + randomNumber * 60000;
    return estimatedArrivalTime

}


