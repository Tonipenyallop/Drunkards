import  { Application, Request, Response, NextFunction } from "express";
import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "../proto/index";
const db = require("../db/db")
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


app.post("/login", ( req: Request, res: Response ) => {
    console.log("db")
    console.log(db.select("*").from())
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
app.listen( expressPORT, () => {
    console.log(`server started at http://localhost:${ expressPORT }` );
} );
