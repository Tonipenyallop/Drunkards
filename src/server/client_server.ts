import path from "path";
const toni = require("path");
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "../proto/index";
import { UserInfo } from "../proto/index/UserInfo";
import { SuccessLogIn } from "../proto/index/SuccessLogIn";

import UserPage from "../components/UserPage";
const PROTO_PATH = "../proto/index.proto";
const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, PROTO_PATH)
);
const grpcObj = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;

const PORT = 8882;

const client = new grpcObj.index.User(
  `0.0.0.0:${PORT}`,
  grpc.credentials.createInsecure()
);

const deadLine = new Date();

deadLine.setSeconds(deadLine.getSeconds() + 5);

client.waitForReady(deadLine, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  onClientReady();
});

function onClientReady() {
  client.Login({ name: "super Taesu", password: "secret" }, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(result);
  });
}
