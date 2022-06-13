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

    let response : LoginResponse= new LoginResponse();
        console.log("webserver")
        console.log(req.body)
    await client.Login(

        {username: req.body.name, password: req.body.password},
        async(err, result) => {
            if (err) {
                return res.status(400).send({message: "Invalid Input"})
            }

            // result is not printed out 
            console.log('result is printed here?');
            console.log(result);
           
           
            // just created session token when user successfully login!
            const sessionToken : string = uuidv4()
            const user = await database
            .select("*")
            .from("users")
            .where("name", req.body.name)
            .andWhere("password", req.body.password);

            await database("sessions").insert({userId: user[0].id, sessionToken })

            res.status(200).send({sessionToken, user: result})
             
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

    await client.CreateReservation( {startLocation: req.body.startLocation, destination: req.body.destination, pickupTime: req.body.pickupTime , sessionToken : req.body.request.sessionToken},   async (err , result) => {
        // console.log(err)
        // console.log(result)
        if(err){
            return res.status(400).send({message: err})
        }
        console.log("successfully request the car")
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
