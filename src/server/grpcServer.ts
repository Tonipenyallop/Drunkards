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
import { GetLatestReservationRequest } from "../proto/index_pb";
import { CancelReservationRequest } from "../proto/index/CancelReservationRequest";
import { CancelReservationResponse } from "../proto/index/CancelReservationResponse";
import { GetArrivalTimeRequest } from "../proto/index/GetArrivalTimeRequest";
import { GetArrivalTimeResponse } from "../proto/index/GetArrivalTimeResponse";

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
      const validRequest = checkValidSessionToken(req.request.sessionToken);
      if ((await validRequest).code !== grpc.status.OK)
        return res((await validRequest) as CreateReservationResponse);

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
      const validRequest = checkValidSessionToken(req.request.sessionToken);
      if ((await validRequest).code !== grpc.status.OK)
        return validRequest as CancelReservationResponse;

      const latestRequest = await getLatestReservation();

      if (!latestRequest) {
        const metadata = new grpc.Metadata();
        metadata.add("type", Exceptions.INVALID_INPUT_EXCEPTION.toString());
        return res({
          code: grpc.status.OUT_OF_RANGE,
          message:
            "Latest request doesn't exit since all the requests are deleted",
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
      console.log("it was called yeah!")
    }
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

function convertToJSDate(jsDate: number): Date {
  // convert into milliseconds because Javascript expects milliseconds
  return new Date(jsDate * 1000);
}

function fromDate(date: Date): Timestamp {
  return {
    seconds: date.getTime() / 1000,
  } as Timestamp;
}

async function getUserId(sessionToken: string): Promise<number> {
  const parsedSessionToken = JSON.parse(sessionToken as string).sessionToken;
  const requestedUser = await database
    .select("*")
    .from("sessions")
    .where("sessionToken", parsedSessionToken);
  return requestedUser[0].userId;
}

async function getLatestReservation(): Promise<any> {
  const notDeletedRequests = await database
    .select("*")
    .from("requests")
    .where("is_deleted", false);

  return notDeletedRequests[notDeletedRequests.length - 1];
}

// 1. if there is no data, request the car
// 2. if all the car is arrived, request the car
async function isAllCarArrived(sessionToken: string) {
  const userId = await getUserId(sessionToken);
  const isAllArrived = await database
    .select("*")
    .from("requests")
    .where("userId", userId)
    .andWhere("is_deleted", false);

  if (isAllArrived.length !== 0) return false;
  return true;
}

main();
