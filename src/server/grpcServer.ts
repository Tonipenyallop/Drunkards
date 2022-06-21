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
import argon2 from "argon2";

import { CreateReservationRequest } from "../proto/index/CreateReservationRequest";
import { CreateReservationResponse } from "../proto/index/CreateReservationResponse";
import { GetReservationResponse } from "../proto/index/GetReservationResponse";
import { Reservation } from "../proto/index/Reservation";
import { Timestamp } from "../proto/google/protobuf/Timestamp";

import { CancelReservationRequest } from "../proto/index/CancelReservationRequest";
import { CancelReservationResponse } from "../proto/index/CancelReservationResponse";
import { GetArrivalTimeRequest } from "../proto/index/GetArrivalTimeRequest";
import { GetArrivalTimeResponse } from "../proto/index/GetArrivalTimeResponse";
import { GetRefreshArrivalTimeRequest } from "../proto/index/GetRefreshArrivalTimeRequest";
import { GetRefreshArrivalTimeResponse} from "../proto/index/GetRefreshArrivalTimeResponse"
import {checkValidSessionToken,isAllCarArrived,
  convertToJSDate,
  getUserId, getLatestReservation, estimatedArrivalTimeGenerator} from "./grpcHelperMethods"
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

      const encryptedPassword = await argon2.hash(
        req.request.password as string
      );
      // const salt = await bcrypt.genSalt();
      // const encryptedPassword = await bcrypt.hash(
      // req.request.password as string,
      // salt
      // );

      await database("users").insert({
        username: req.request.username,
        // password: req.request.password,
        password: encryptedPassword,
      });

      return res(null, { sessionToken: "congrats!" });
    },

    Login: async (
      req: grpc.ServerUnaryCall<LoginRequest, LoginResponse>,
      res: grpc.sendUnaryData<LoginResponse>
    ) => {
      if (req.request.username === "" || req.request.password === "") {
        const metadata = new grpc.Metadata();
        metadata.add("type", Exceptions.INVALID_INPUT_EXCEPTION.toString());
        return res({
          code: grpc.status.INVALID_ARGUMENT,
          message: "Username and Password must be filled out",
          metadata,
        });
      }

      const user = await database
        .select("*")
        .from("users")
        .where("username", req.request.username);

      if (user.length === 0) {
        const metadata = new grpc.Metadata();
        metadata.add("type", Exceptions.INVALID_INPUT_EXCEPTION.toString());
        return res({
          code: grpc.status.NOT_FOUND,
          message: "Username doesn't exit in database",
          metadata,
        });
      }

      const isValidPassword = await argon2.verify(
        user[0].password,
        req.request.password as string
      );

      if (!isValidPassword) {
        const metadata = new grpc.Metadata();
        metadata.add("type", Exceptions.INVALID_INPUT_EXCEPTION.toString());
        return res({
          code: grpc.status.CANCELLED,
          message: "password is not much with verified agron password",
          metadata,
        });
      }

      const sessionToken: string = uuidv4();

      const userId = await database
        .select("*")
        .from("users")
        .where("username", req.request.username);

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
      const validRequest = await checkValidSessionToken(req.request.sessionToken);
      if (validRequest.code !== grpc.status.OK){
        return res(validRequest as CreateReservationResponse);
}
      const isCarArrived = await isAllCarArrived(
        req.request.sessionToken as string
      );

      if (!isCarArrived) {
        const metadata = new grpc.Metadata();
        metadata.add("type", Exceptions.INVALID_INPUT_EXCEPTION.toString())
        return res({
          code: grpc.status.CANCELLED,
          message:
            "Not all the cars are arrived yet. You cannot use this method yet",
          metadata,
        });
      }

      const startLocation = req.request.startLocation;
      const destination = req.request.destination;

      // check all the input is fill out
      if (startLocation === "" || destination === "") {
        const metadata = new grpc.Metadata();
        metadata.add("type", Exceptions.INVALID_INPUT_EXCEPTION.toString());
        return res({
          code: grpc.status.INVALID_ARGUMENT,
          message: "startLocation and destination must be filled",
          metadata,
        });
      }

      const parsedSessionToken = JSON.parse(
        req.request.sessionToken as string
      ).sessionToken;
      const requestedUser = await database
        .select("*")
        .from("sessions")
        .where("sessionToken", parsedSessionToken);

      const pickupTime = convertToJSDate(
        req.request.pickupTime?.seconds as number
      );

      const userId = await getUserId(req.request.sessionToken as string);
      if(userId === Exceptions.UNAUTHORIZED_USER_EXCEPTION) { return res({code: grpc.status.UNAUTHENTICATED, message: "sessionToken doesn't match"})}

      const reservationID: string = uuidv4();
      await database("requests").insert({
        userId,
        startLocation,
        destination,
        pickupTime: pickupTime,
        is_deleted: false,
        reservationID,
      });

      return res(null, {} as CreateReservationResponse);
    },
    GetReservation: async (
      req: grpc.ServerUnaryCall<GetReservationRequest, GetReservationResponse>,
      res: grpc.sendUnaryData<GetReservationResponse>
    ) => {
      const validRequest = checkValidSessionToken(req.request.sessionToken);
      if ((await validRequest).code !== grpc.status.OK)
        return res(await validRequest);
      const userId = await getUserId(req.request.sessionToken as string);
      if(userId === Exceptions.UNAUTHORIZED_USER_EXCEPTION) {return res({code:grpc.status.UNAUTHENTICATED, message:"sessionToken not matches"})}
      const allRequests = await database
        .select("startLocation", "destination", "pickupTime", "reservationID")
        .from("requests")
        .where("userId", userId);

      function toReservation(singleRow: any): Reservation {
        return {
          startLocation: singleRow.startLocation,
          destination: singleRow.destination,
          pickupTime: { seconds: singleRow.pickupTime.getTime() / 1000 },
          reservationID: singleRow.reservationID,
        } as Reservation;
      }

      const reservations: Reservation[] = allRequests.map(toReservation);

      const response: GetReservationResponse = {
        reservations: reservations,
      };
      res(null, response);
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
    CancelReservation: async (
      req: grpc.ServerUnaryCall<
        CancelReservationRequest,
        CancelReservationRequest
      >,
      res: grpc.sendUnaryData<CancelReservationResponse>
    ) => {

      const validRequest = await checkValidSessionToken(req.request.sessionToken);
      if ((validRequest).code !== grpc.status.OK) return res(validRequest as CancelReservationResponse)

      const latestRequest = await getLatestReservation(req.request.sessionToken as string);
      if(latestRequest === Exceptions.UNAUTHORIZED_USER_EXCEPTION) return res({code: grpc.status.UNAUTHENTICATED, message: "sessionToken not matches"})
      if (!latestRequest) {
        const metadata = new grpc.Metadata();
        metadata.add("type", Exceptions.INVALID_INPUT_EXCEPTION.toString());
        return res({
          code: grpc.status.OUT_OF_RANGE,
          message:
            "All the requests are already deleted or arrived yet",
          metadata,
        });
      }

      latestRequest.is_deleted = true;

      await database("requests")
        .update("is_deleted", true)
        .where("reservationID", latestRequest.reservationID);

      res(null, {} as CancelReservationResponse);
    },
    GetArrivalTime : async (req: grpc.ServerUnaryCall<GetArrivalTimeRequest, GetArrivalTimeResponse>, res: grpc.sendUnaryData<GetArrivalTimeResponse>) => {
      const validRequest = await checkValidSessionToken(req.request.sessionToken);
      if ((validRequest).code !== grpc.status.OK)
        return validRequest as GetArrivalTimeResponse; 
        const estimatedArrivalTime = estimatedArrivalTimeGenerator()

        const timeStampObj: Timestamp = {
        seconds : estimatedArrivalTime 
        }
        const arrivalTimeResponse : GetArrivalTimeResponse = {
          arrivalTime : timeStampObj
        }
        return res(null, arrivalTimeResponse)
    },

    GetRefreshArrivalTime: async (req: grpc.ServerUnaryCall<GetRefreshArrivalTimeRequest,GetRefreshArrivalTimeResponse>, res: grpc.sendUnaryData<GetRefreshArrivalTimeResponse>) => {
      const validRequest = await checkValidSessionToken(req.request.sessionToken);
      if ((validRequest).code !== grpc.status.OK)
        return validRequest as GetArrivalTimeResponse; 
        
      const max = 1
      const min = -1
      const randomDelay = Math.floor(Math.random() *(max - min + 1) + min);
      const timestampObj : Timestamp = {
        seconds : randomDelay * 60000
      }

      const refreshArrivalTimeResponse : GetRefreshArrivalTimeResponse  = {
        delayedTime : timestampObj
      }
      return res(null, refreshArrivalTimeResponse);
    },
  });
  return server;
}

main();
