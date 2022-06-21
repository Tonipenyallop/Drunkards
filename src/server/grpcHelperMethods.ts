import * as grpc from "@grpc/grpc-js";
import { Exceptions } from "../proto/index/Exceptions";
import { Timestamp } from "../proto/google/protobuf/Timestamp";

const database = require("../db/db");

export async function checkValidSessionToken(sessionToken: string | undefined) {
  console.log(`is this method called checkValidSessionToken? `)  
  const metadata = new grpc.Metadata();
    if (!sessionToken) {
      metadata.add("type", Exceptions.UNAUTHORIZED_USER_EXCEPTION.toString());
      return {
        code: grpc.status.UNAUTHENTICATED,
        message: "sessionToken is missing from request",
        metadata,
      };
    }
    console.log("here? middle?")
    const parsedSessionToken = JSON.parse(sessionToken).sessionToken;
    const requestedUser = await database
      .select("*")
      .from("sessions")
      .where("sessionToken", parsedSessionToken);
    
      console.log(`requestedUser: ${JSON.stringify(requestedUser)}`)

  
    // check token matches from database
    if (requestedUser.length === 0) {
      metadata.add("type", Exceptions.UNAUTHORIZED_USER_EXCEPTION.toString());
      return {
        code: grpc.status.UNAUTHENTICATED,
        message: "sessionToken doesn't match from database",
        metadata,
      };
    }

    console.log(`end of line?`)

  
    return {
      code: grpc.status.OK,
      message: "sessionToken valid",
      metadata,
    };
  }
  
  
export function convertToJSDate(jsDate: number): Date {
    // convert into milliseconds because Javascript expects milliseconds
    return new Date(jsDate * 1000);
  }
  
export function fromDate(date: Date): Timestamp {
    return {
      seconds: date.getTime() / 1000,
    } as Timestamp;
  }

export async function getUserId(sessionToken: string): Promise<number>{
    const parsedSessionToken = JSON.parse(sessionToken as string).sessionToken;
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
    // times 1000 since convert from milliseconds to minute
    const estimatedArrivalTime = new Date().getTime() + randomNumber * 60000;
    return estimatedArrivalTime
  
  }
  