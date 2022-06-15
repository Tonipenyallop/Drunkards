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
import { CreateReservationRequest } from "../proto/index/CreateReservationRequest";
import { CreateReservationResponse } from "../proto/index/CreateReservationResponse";
import { ok } from "assert";

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
      // check username and password is filled
      if (req.request.username === "" || req.request.password === "") {
        const metadata = new grpc.Metadata();
        metadata.add("type", Exceptions.INVALID_INPUT_EXCEPTION.toString());

        return res({
          code: grpc.status.INVALID_ARGUMENT,
          message: "Username or password is empty",
          metadata,
        });
      }

      const userName = await database
        .select("username")
        .from("users")
        .where("username", req.request.username);

      // check user doesn't have an account
      if (userName.length >= 1) {
        const metadata = new grpc.Metadata();
        metadata.add("type", Exceptions.INVALID_INPUT_EXCEPTION.toString());
        return res({
          code: grpc.status.ALREADY_EXISTS,
          message: "Username already registered",
          metadata: metadata,
        });
      }

      await database("users").insert({
        username: req.request.username,
        password: req.request.password,
      });

      return res(null, { sessionToken: "congrats!" });
    },

    Login: async (
      req: grpc.ServerUnaryCall<LoginRequest, LoginResponse>,
      res: grpc.sendUnaryData<LoginResponse>
    ) => {
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
      const userId = await database
        .select("*")
        .from("users")
        .where("username", req.request.username)
        .andWhere("password", req.request.password);

      await database("sessions").insert({ userId: userId[0].id, sessionToken });

      return res(null, { sessionToken } as LoginResponse);
    },
    CreateReservation: async (
      req: grpc.ServerUnaryCall<
        CreateReservationRequest,
        CreateReservationResponse
      >,
      res: grpc.sendUnaryData<CreateReservationResponse>
    ) => {
      // check authorized user
      const validRequest = checkValidSessionToken(req.request.sessionToken);
      if ((await validRequest).code !== grpc.status.OK)
        return res(validRequest as CreateReservationResponse);

      const parsedSessionToken = JSON.parse(
        req.request.sessionToken as string
      ).sessionToken;
      const requestedUser = await database
        .select("*")
        .from("sessions")
        .where("sessionToken", parsedSessionToken);

      // convert into milliseconds because Javascript expects milliseconds
      const pickupTime = new Date(
        (req.request.pickupTime?.seconds as number) * 1000
      );

      await database("requests").insert({
        userId: requestedUser[0].userId,
        start_location: req.request.startLocation,
        destination: req.request.destination,
        pickupTime: pickupTime,
        is_deleted: false,
      });

      return res(null, {} as CreateReservationResponse);
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

async function checkValidSessionToken(sessionToken: string | undefined) {
  // check authorized user
  const metadata = new grpc.Metadata();
  if (!sessionToken) {
    metadata.add("type", Exceptions.UNAUTHORIZED_USER_EXCEPTION.toString());
    return {
      code: grpc.status.PERMISSION_DENIED,
      message: "sessionToken is missing from request",
      metadata,
    };
  }
  const parsedSessionToken = JSON.parse(sessionToken).sessionToken;
  const requestedUser = await database
    .select("*")
    .from("sessions")
    .where("sessionToken", parsedSessionToken);

  // sessionToken is correct from database and requested token
  if (requestedUser.length === 0) {
    metadata.add("type", Exceptions.UNAUTHORIZED_USER_EXCEPTION.toString());
    return {
      code: grpc.status.UNAUTHENTICATED,
      message: "sessionToken doesn't match from database",
      metadata,
    };
  }

  return {
    code: grpc.status.OK,
    message: "sessionToken valid",
    metadata,
  };
}

main();
