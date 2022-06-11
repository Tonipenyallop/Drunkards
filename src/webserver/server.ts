// import express from "express";
const express = require("express")
const cors = require("cors")

const app = express();
const port = 8080; // default port to listen
import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "../proto/index";


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


app.use(cors());

// define a route handler for the default home page
app.get("/", ( req: any, res:any ) => {
    res.send( "HOLA TONI" );
    client.Login(
        { name: "MUI GRANDE", password: "fromClient_server" },
        (err, result) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log(result);
        }
      );
} );

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
