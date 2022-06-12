import  { Application, Request, Response, NextFunction } from "express";
import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "../proto/index";
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
    const user = await database.select("*").from("users").where("name", req.body.name).andWhere("password", req.body.password)
    if(user.length === 0) {
        res.sendStatus(400) 
        return 
    }

    client.Login(
        { username: user[0].name, password: user[0].password },
        (err, result) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('result');
            
            console.log(result);
            const sessionToken : string = uuidv4()
            console.log("sessionToken")
            console.log(sessionToken)
            
        }
        );
        res.send( "HOLA TONI" );
    }
    catch (err){
        res.send({message : err})
    }
} );

app.post("/signUp", async (req: Request, res: Response)=> {
    res.send("SIGNUP")
})
// start the Express server
app.listen( expressPORT, () => {
    console.log(`server started at http://localhost:${ expressPORT }` );
} );
