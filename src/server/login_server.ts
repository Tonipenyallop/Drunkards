import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "../proto/index";
import { Exceptions } from "../proto/index/Exceptions";
import { GetReservationRequest } from "../proto/index/GetReservationRequest";

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
      if (req.request.username === "" || req.request.password === "")
        return res(null, { message: "Invalid input", code: 400 });
      console.log("SIGN UP FUNCTION WAS CALLED!!!");
      console.log(req.request);
      const userName = await database
        .select("username")
        .from("users")
        // .where("name", "Jojo");
        .where("username", req.request.username);
      if (userName.length >= 1) {
        console.log("Already have an account");
        return res(null, { message: "Already have an account", code: 401 });
      }

      await database("users").insert({
        username: req.request.username,
        password: req.request.password,
      });
      return res(null, { message: "congrats!" });
    },

    Login: async (req: any, res: any) => {
      console.log("LOGIN FUNCTION WAS CALLED!!!");
      const user = await database
        .select("*")
        .from("users")
        .where("username", req.request.username)
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
        return res(null, { message: "Unauthorized User", code: 401 });
      }

      await database("requests").insert({
        userId: requestedUser[0].userId,
        start_location: req.request.startLocation,
        destination: req.request.destination,
        pickupTime: "12:30:55.12345-05:00",
      });

      res(null, {});
    },
    GetReservation: async (req: any, res: any) => {
      if (!req.request.sessionToken)
        return res(null, { message: "Unauthorized User", code: 401 });
      console.log("get reservation was called");
      console.log(req.request);
      const validUser = await database
        .select("*")
        .from("sessions")
        .where("sessionToken", req.request.sessionToken);
      console.log(validUser);
      if (validUser.length === 0) {
        return res(null, { message: "Unauthorized User", code: 401 });
      }
    },

    GetLatestReservation: async (req: any, res: any) => {
      if (!req.request.sessionToken)
        return res(null, { message: "Unauthorized User", code: 401 });
      const validUser = await database
        .select("*")
        .from("sessions")
        .where("sessionToken", req.request.sessionToken);

      if (validUser.length === 0) {
        return res(null, { message: "Unauthorized User", code: 401 });
      }
    },
  });
  return server;
}

main();
