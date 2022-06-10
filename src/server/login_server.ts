import path from "path";
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
const index = grpcObj.index;

const PORT = 8882;
// when PORT is same it worked
// const PORT = 8080;

export function main() {
  const server = getServer();
  server.bindAsync(
    `0.0.0.0:${PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.log("error detected");
        console.error(err);
        return;
      }
      console.log(`Server connected with PORT ${PORT}`);
      server.start();
    }
  );
}

function getServer() {
  const server = new grpc.Server();

  console.log("getServer function was called!");

  server.addService(index.User.service, {
    Login: (req: any, res: any) => {
      console.log("LOGIN FUNCTION WAS CALLED!!!");
      console.log(req.request);
      res(null, { isSuccess: true });
    },
  });
  return server;
}

main();

// import * as toni from "@grpc/proto-loader";
// var PROTO_PATH = __dirname + "../proto/index.proto";
// var grpc = require("@grpc/grpc-js");
// var protoLoader = require("@grpc/proto-loader");
// // Suggested options for similarity to existing grpc.load behavior
// var packageDefinition = protoLoader.loadSync(PROTO_PATH);
// var protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
// // The protoDescriptor object has the full package hierarchy
// var routeguide = protoDescriptor.routeguide;

// function login() {}

// function getServer() {
//   const server = new grpc.Server();
//   server.addService(routeguide.RouteGuide.service);
//   return server;
// }

// const routeServer = getServer();
// routeServer.bindAsync(
//   "0.0.0.0:50051",
//   grpc.ServerCredentials.createInsecure(),
//   () => {
//     routeServer.start();
//   }
// );
