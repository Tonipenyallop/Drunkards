import * as jspb from 'google-protobuf'



export class LoginRequest extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): LoginRequest;

  getPassword(): string;
  setPassword(value: string): LoginRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoginRequest.AsObject;
  static toObject(includeInstance: boolean, msg: LoginRequest): LoginRequest.AsObject;
  static serializeBinaryToWriter(message: LoginRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoginRequest;
  static deserializeBinaryFromReader(message: LoginRequest, reader: jspb.BinaryReader): LoginRequest;
}

export namespace LoginRequest {
  export type AsObject = {
    username: string,
    password: string,
  }
}

export class LoginResponse extends jspb.Message {
  getSessiontoken(): string;
  setSessiontoken(value: string): LoginResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoginResponse.AsObject;
  static toObject(includeInstance: boolean, msg: LoginResponse): LoginResponse.AsObject;
  static serializeBinaryToWriter(message: LoginResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoginResponse;
  static deserializeBinaryFromReader(message: LoginResponse, reader: jspb.BinaryReader): LoginResponse;
}

export namespace LoginResponse {
  export type AsObject = {
    sessiontoken: string,
  }
}

export class RegisterRequest extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): RegisterRequest;

  getPassword(): string;
  setPassword(value: string): RegisterRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RegisterRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RegisterRequest): RegisterRequest.AsObject;
  static serializeBinaryToWriter(message: RegisterRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RegisterRequest;
  static deserializeBinaryFromReader(message: RegisterRequest, reader: jspb.BinaryReader): RegisterRequest;
}

export namespace RegisterRequest {
  export type AsObject = {
    username: string,
    password: string,
  }
}

export class RegisterResponse extends jspb.Message {
  getSessiontoken(): string;
  setSessiontoken(value: string): RegisterResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RegisterResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RegisterResponse): RegisterResponse.AsObject;
  static serializeBinaryToWriter(message: RegisterResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RegisterResponse;
  static deserializeBinaryFromReader(message: RegisterResponse, reader: jspb.BinaryReader): RegisterResponse;
}

export namespace RegisterResponse {
  export type AsObject = {
    sessiontoken: string,
  }
}

export class CreateReservationRequest extends jspb.Message {
  getStartlocation(): string;
  setStartlocation(value: string): CreateReservationRequest;

  getDestination(): string;
  setDestination(value: string): CreateReservationRequest;

  getPickuptime(): number;
  setPickuptime(value: number): CreateReservationRequest;

  getSessiontoken(): string;
  setSessiontoken(value: string): CreateReservationRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateReservationRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateReservationRequest): CreateReservationRequest.AsObject;
  static serializeBinaryToWriter(message: CreateReservationRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateReservationRequest;
  static deserializeBinaryFromReader(message: CreateReservationRequest, reader: jspb.BinaryReader): CreateReservationRequest;
}

export namespace CreateReservationRequest {
  export type AsObject = {
    startlocation: string,
    destination: string,
    pickuptime: number,
    sessiontoken: string,
  }
}

export class CreateReservationResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateReservationResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateReservationResponse): CreateReservationResponse.AsObject;
  static serializeBinaryToWriter(message: CreateReservationResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateReservationResponse;
  static deserializeBinaryFromReader(message: CreateReservationResponse, reader: jspb.BinaryReader): CreateReservationResponse;
}

export namespace CreateReservationResponse {
  export type AsObject = {
  }
}

export class GetReservationRequest extends jspb.Message {
  getSessiontoken(): string;
  setSessiontoken(value: string): GetReservationRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetReservationRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetReservationRequest): GetReservationRequest.AsObject;
  static serializeBinaryToWriter(message: GetReservationRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetReservationRequest;
  static deserializeBinaryFromReader(message: GetReservationRequest, reader: jspb.BinaryReader): GetReservationRequest;
}

export namespace GetReservationRequest {
  export type AsObject = {
    sessiontoken: string,
  }
}

export class GetReservationResponse extends jspb.Message {
  getReservationsList(): Array<Reservation>;
  setReservationsList(value: Array<Reservation>): GetReservationResponse;
  clearReservationsList(): GetReservationResponse;
  addReservations(value?: Reservation, index?: number): Reservation;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetReservationResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetReservationResponse): GetReservationResponse.AsObject;
  static serializeBinaryToWriter(message: GetReservationResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetReservationResponse;
  static deserializeBinaryFromReader(message: GetReservationResponse, reader: jspb.BinaryReader): GetReservationResponse;
}

export namespace GetReservationResponse {
  export type AsObject = {
    reservationsList: Array<Reservation.AsObject>,
  }
}

export class Reservation extends jspb.Message {
  getStartlocation(): string;
  setStartlocation(value: string): Reservation;

  getDestination(): string;
  setDestination(value: string): Reservation;

  getPickuptime(): number;
  setPickuptime(value: number): Reservation;

  getReservationid(): number;
  setReservationid(value: number): Reservation;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Reservation.AsObject;
  static toObject(includeInstance: boolean, msg: Reservation): Reservation.AsObject;
  static serializeBinaryToWriter(message: Reservation, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Reservation;
  static deserializeBinaryFromReader(message: Reservation, reader: jspb.BinaryReader): Reservation;
}

export namespace Reservation {
  export type AsObject = {
    startlocation: string,
    destination: string,
    pickuptime: number,
    reservationid: number,
  }
}

export class CancelReservationRequest extends jspb.Message {
  getReservationid(): number;
  setReservationid(value: number): CancelReservationRequest;

  getSessiontoken(): string;
  setSessiontoken(value: string): CancelReservationRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CancelReservationRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CancelReservationRequest): CancelReservationRequest.AsObject;
  static serializeBinaryToWriter(message: CancelReservationRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CancelReservationRequest;
  static deserializeBinaryFromReader(message: CancelReservationRequest, reader: jspb.BinaryReader): CancelReservationRequest;
}

export namespace CancelReservationRequest {
  export type AsObject = {
    reservationid: number,
    sessiontoken: string,
  }
}

export class CancelReservationResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CancelReservationResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CancelReservationResponse): CancelReservationResponse.AsObject;
  static serializeBinaryToWriter(message: CancelReservationResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CancelReservationResponse;
  static deserializeBinaryFromReader(message: CancelReservationResponse, reader: jspb.BinaryReader): CancelReservationResponse;
}

export namespace CancelReservationResponse {
  export type AsObject = {
  }
}

export class GetLatestReservationRequest extends jspb.Message {
  getSessiontoken(): string;
  setSessiontoken(value: string): GetLatestReservationRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetLatestReservationRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetLatestReservationRequest): GetLatestReservationRequest.AsObject;
  static serializeBinaryToWriter(message: GetLatestReservationRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetLatestReservationRequest;
  static deserializeBinaryFromReader(message: GetLatestReservationRequest, reader: jspb.BinaryReader): GetLatestReservationRequest;
}

export namespace GetLatestReservationRequest {
  export type AsObject = {
    sessiontoken: string,
  }
}

export class GetLatestReservationResponse extends jspb.Message {
  getLatestreservation(): Reservation | undefined;
  setLatestreservation(value?: Reservation): GetLatestReservationResponse;
  hasLatestreservation(): boolean;
  clearLatestreservation(): GetLatestReservationResponse;

  getEstimatedtimeonarrival(): number;
  setEstimatedtimeonarrival(value: number): GetLatestReservationResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetLatestReservationResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetLatestReservationResponse): GetLatestReservationResponse.AsObject;
  static serializeBinaryToWriter(message: GetLatestReservationResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetLatestReservationResponse;
  static deserializeBinaryFromReader(message: GetLatestReservationResponse, reader: jspb.BinaryReader): GetLatestReservationResponse;
}

export namespace GetLatestReservationResponse {
  export type AsObject = {
    latestreservation?: Reservation.AsObject,
    estimatedtimeonarrival: number,
  }
}

export enum Exceptions { 
  INVALID_INPUT_EXCEPTION = 0,
  UNAUTHORIZED_USER_EXCEPTION = 1,
}
