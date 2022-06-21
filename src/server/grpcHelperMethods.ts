import * as grpc from "@grpc/grpc-js";
import { Exceptions } from "../proto/index/Exceptions";
import { Timestamp } from "../proto/google/protobuf/Timestamp";

const database = require("../db/db");
export async function checkValidSessionToken(sessionToken: string | undefined) {
    // check authorized user
    const metadata = new grpc.Metadata();
    // sessionToken = JSON.parse(sessionToken).sessionToken
    // sessionToken = JSON.parse(req.body.sessionToken).sessionToken
  
    // console.log(`sessionToken: ${sessionToken}`)
    if (!sessionToken) {
      // console.log("must print here")
      metadata.add("type", Exceptions.UNAUTHORIZED_USER_EXCEPTION.toString());
      return {
        code: grpc.status.UNAUTHENTICATED,
        message: "sessionToken is missing from request",
        metadata,
      };
    }
    const parsedSessionToken = JSON.parse(sessionToken).sessionToken;
    const requestedUser = database
      .select("*")
      .from("sessions")
      .where("sessionToken", parsedSessionToken);
  
      // console.log(`requestedUser: ${requestedUser}`)
  
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
  // async function checkValidSessionToken(sessionToken: string | undefined) {
  //   // check authorized user
  //   const metadata = new grpc.Metadata();
  //   // sessionToken = JSON.parse(sessionToken).sessionToken
  //   // sessionToken = JSON.parse(req.body.sessionToken).sessionToken
  
  //   console.log(`sessionToken: ${sessionToken}`)
  //   if (!sessionToken) {
  //     console.log("must print here")
  //     metadata.add("type", Exceptions.UNAUTHORIZED_USER_EXCEPTION.toString());
  //     return {
  //       code: grpc.status.UNAUTHENTICATED,
  //       message: "sessionToken is missing from request",
  //       metadata,
  //     };
  //   }
  //   const parsedSessionToken = JSON.parse(sessionToken).sessionToken;
  //   const requestedUser = database
  //     .select("*")
  //     .from("sessions")
  //     .where("sessionToken", parsedSessionToken);
  
  //     console.log(`requestedUser: ${requestedUser}`)
  
  //   // sessionToken is correct from database and requested token
  //   if (requestedUser.length === 0) {
  //     metadata.add("type", Exceptions.UNAUTHORIZED_USER_EXCEPTION.toString());
  //     return {
  //       code: grpc.status.UNAUTHENTICATED,
  //       message: "sessionToken doesn't match from database",
  //       metadata,
  //     };
  //   }
  
  //   return {
  //     code: grpc.status.OK,
  //     message: "sessionToken valid",
  //     metadata,
  //   };
  // }
  
export function convertToJSDate(jsDate: number): Date {
    // convert into milliseconds because Javascript expects milliseconds
    return new Date(jsDate * 1000);
  }
  
export function fromDate(date: Date): Timestamp {
    return {
      seconds: date.getTime() / 1000,
    } as Timestamp;
  }
  
  // async function getUserId(sessionToken: string): Promise<number> {
  //   const parsedSessionToken = JSON.parse(sessionToken as string).sessionToken;
  //   const requestedUser = await database
  //     .select("*")
  //     .from("sessions")
  //     .where("sessionToken", parsedSessionToken);
  //   return requestedUser[0].userId;
  // }
  export async function getUserId(sessionToken: string): Promise<number>{
    console.log(`getUserId`)
    
  
    const parsedSessionToken = JSON.parse(sessionToken as string).sessionToken;
    console.log(`parsedSessionToken: ${parsedSessionToken}`)
    const requestedUser = await database
      .select("*")
      .from("sessions")
      .where("sessionToken", parsedSessionToken);
  
      if(requestedUser.length === 0) return Exceptions.UNAUTHORIZED_USER_EXCEPTION
    return requestedUser[0].userId;
  }
  
export async function getLatestReservation(sessionToken: string): Promise<any> {
    const userId = await getUserId(sessionToken);
    if(userId === Exceptions.UNAUTHORIZED_USER_EXCEPTION) {return Exceptions.UNAUTHORIZED_USER_EXCEPTION}
  
  
    const notDeletedRequests = await database
      .select("*")
      .from("requests").where("userId", userId)
      .where("is_deleted", false);
  
      console.log(`notDeletedRequest: ${JSON.stringify(notDeletedRequests)}`)
  
    return notDeletedRequests[notDeletedRequests.length - 1];
  }
  
  // 1. if there is no data, request the car
  // 2. if all the car is arrived, request the car
export async function isAllCarArrived(sessionToken: string) {
    const userId = await getUserId(sessionToken);
    const isAllArrived = await database
      .select("*")
      .from("requests")
      .where("userId", userId)
      .andWhere("is_deleted", false);
  
    if (isAllArrived.length !== 0) return false;
    return true;
  }
  
export function estimatedArrivalTimeGenerator(max: number = 10, min: number = 5) : number{
    const randomNumber =  Math.floor(Math.random() * (max - min + 1) + min);
    console.log(`randomNumber: ${randomNumber * 60000}`)
    // times 1000 since convert from milliseconds to minute
    const estimatedArrivalTime = new Date().getTime() + randomNumber * 60000;
    return estimatedArrivalTime
  
  }
  