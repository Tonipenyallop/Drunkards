import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "../proto/index";
import { Exceptions } from "../proto/index/Exceptions";
import { GetReservationRequest } from "../proto/index/GetReservationRequest";
import { LoginResponse } from "../proto/index/LoginResponse";
import { LoginRequest } from "../proto/index/LoginRequest";
import { RegisterRequest } from "../proto/index/RegisterRequest";
import { RegisterResponse } from "../proto/index/RegisterResponse";
import { v4 as uuidv4 } from "uuid";
import { groupCollapsed } from "console";

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
    Register: async (
      req: grpc.ServerUnaryCall<RegisterRequest, RegisterResponse>,
      res: grpc.sendUnaryData<RegisterResponse>
    ) => {
      if (req.request.username === "" || req.request.password === "")
        // return res(null, { message: "Invalid input", code: 400 });
        return res({
          code: grpc.status.INVALID_ARGUMENT,
          message: "Username or password is empty",
        });
      console.log("SIGN UP FUNCTION WAS CALLED!!!");
      console.log(req.request);
      const userName = await database
        .select("username")
        .from("users")
        // .where("name", "Jojo");
        .where("username", req.request.username);
      if (userName.length >= 1) {
        const metadata = new grpc.Metadata();
        metadata.add("type", Exceptions.INVALID_INPUT_EXCEPTION.toString());
        return res({
          code: grpc.status.ALREADY_EXISTS,
          message: "Username already registered",
          metadata: metadata,
        });
      }

      // await database("users").insert({
      //   username: req.request.username,
      //   password: req.request.password,
      // });
      // const sessionToken: string = uuidv4();
      // const user = await database
      //   .select("*")
      //   .from("users")
      //   .where("username", req.body.username)
      //   .andWhere("password", req.body.password);
      // await database("sessions").insert({ userId: user[0].id, sessionToken });

      return res(null, { sessionToken: "congrats!" });
    },

    Login: async (
      req: grpc.ServerUnaryCall<LoginRequest, LoginResponse>,
      res: grpc.sendUnaryData<LoginResponse>
    ) => {
      console.log(`Login Request: ${JSON.stringify(req)}`);
      if (req.request.username === "" || req.request.password === "") {
        const metadata = new grpc.Metadata();
        return res({
          code: grpc.status.INVALID_ARGUMENT,
          message: "Username and Password must be filled out",
          metadata,
        });
      }
      const user = await database
        .select("*")
        .from("users")
        .where("username", req.request.username)
        .andWhere("password", req.request.password);
      if (user.length === 0) {
        const metadata = new grpc.Metadata();
        metadata.add("type", Exceptions.INVALID_INPUT_EXCEPTION.toString());
        return res({
          code: grpc.status.NOT_FOUND,
          message: "Username or password is wrong ",
          metadata,
        });
      }

      await database("users").insert({
        username: req.request.username,
        password: req.request.password,
      });

      const sessionToken: string = uuidv4();

      return res(null, { sessionToken } as LoginResponse);
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
        is_deleted: false,
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
    CancelReservation: async (req: any, res: any) => {
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
