import  { Application, Request, Response, NextFunction } from "express";

import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "../proto/index";
import { Http2ServerRequest } from "http2";
// import express from "express";
const express = require("express")
const cors = require("cors")

const app = express();
const port = 8080; // default port to listen


app.use(cors());
app.use(
    express.urlencoded({
      extended: true,
    })
  );
app.use(express.json());


const PROTO_PATH = "../proto/index.proto";

const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, PROTO_PATH)
);

const grpcObj = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;

const PORT = 8882;
// tryna make it same as envoy port

const client = new grpcObj.index.User(
  `0.0.0.0:${PORT}`,
  grpc.credentials.createInsecure()
);




// define a route handler for the default home page
app.post("/login", ( req: Request, res: Response ) => {

    client.Login(
        { username: req.body.name, password: req.body.password },
        (err, result) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('result');
            
            console.log(result);
            
        }
        );
        res.send( "HOLA TONI" );

} );

// start the Express server
app.listen( port, () => {
    console.log(`server started at http://localhost:${ port }` );
} );
