import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "../proto/index";
import { Exceptions } from "../proto/index/Exceptions";

const database = require("../db/db");

const PROTO_PATH = "../proto/index.proto";
const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, PROTO_PATH)
);
const grpcObj = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;
const index = grpcObj.index;

const PORT = 8882;

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
    SignUp: async (req: any, res: any) => {
      console.log("SIGN UP FUNCTION WAS CALLED!!!");
      console.log(req.request);

      return res(null, { message: "congrats!" });
    },

    Login: async (req: any, res: any) => {
      console.log("LOGIN FUNCTION WAS CALLED!!!");
      const user = await database
        .select("*")
        .from("users")
        .where("name", req.request.username)
        .andWhere("password", req.request.password);
      if (user.length === 0) {
        console.log("invalid input error here!!!");
        return res({
          code: 400,
          message: "invalid input",
          status: grpc.status.INTERNAL,
        });
      }
      // from here i wanna send the user to node server. then store id and token together in database!
      return res(null, { user, message: "c'mon man please read this message" });
    },
    CreateReservation: async (req: any, res: any) => {
      if (!req.request.sessionToken)
        return res(null, { message: "Unauthorized User", code: 401 });
      const requestedUser = await database
        .select("*")
        .from("sessions")
        .where("sessionToken", req.request.sessionToken);

      if (requestedUser.length === 0) {
        // const toni : Exceptions = {}
        // toni.unauthorizedUser = "Unauthorized User"
        return res(null, { message: "Unauthorized User", code: 401 });
      }
      console.log("temp");
      // console.log(temp);
      res(null, {});
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
