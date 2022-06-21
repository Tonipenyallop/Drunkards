import * as jspb from 'google-protobuf'

import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';


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

  getPickuptime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setPickuptime(value?: google_protobuf_timestamp_pb.Timestamp): CreateReservationRequest;
  hasPickuptime(): boolean;
  clearPickuptime(): CreateReservationRequest;

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
    pickuptime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
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

  getPickuptime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setPickuptime(value?: google_protobuf_timestamp_pb.Timestamp): Reservation;
  hasPickuptime(): boolean;
  clearPickuptime(): Reservation;

  getReservationid(): string;
  setReservationid(value: string): Reservation;

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
    pickuptime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    reservationid: string,
  }
}

export class CancelReservationRequest extends jspb.Message {
  getReservationid(): string;
  setReservationid(value: string): CancelReservationRequest;

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
    reservationid: string,
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

  getEstimatedtimeonarrival(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setEstimatedtimeonarrival(value?: google_protobuf_timestamp_pb.Timestamp): GetLatestReservationResponse;
  hasEstimatedtimeonarrival(): boolean;
  clearEstimatedtimeonarrival(): GetLatestReservationResponse;

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
    estimatedtimeonarrival?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

export class GetArrivalTimeRequest extends jspb.Message {
  getSessiontoken(): string;
  setSessiontoken(value: string): GetArrivalTimeRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetArrivalTimeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetArrivalTimeRequest): GetArrivalTimeRequest.AsObject;
  static serializeBinaryToWriter(message: GetArrivalTimeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetArrivalTimeRequest;
  static deserializeBinaryFromReader(message: GetArrivalTimeRequest, reader: jspb.BinaryReader): GetArrivalTimeRequest;
}

export namespace GetArrivalTimeRequest {
  export type AsObject = {
    sessiontoken: string,
  }
}

export class GetArrivalTimeResponse extends jspb.Message {
  getArrivaltime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setArrivaltime(value?: google_protobuf_timestamp_pb.Timestamp): GetArrivalTimeResponse;
  hasArrivaltime(): boolean;
  clearArrivaltime(): GetArrivalTimeResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetArrivalTimeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetArrivalTimeResponse): GetArrivalTimeResponse.AsObject;
  static serializeBinaryToWriter(message: GetArrivalTimeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetArrivalTimeResponse;
  static deserializeBinaryFromReader(message: GetArrivalTimeResponse, reader: jspb.BinaryReader): GetArrivalTimeResponse;
}

export namespace GetArrivalTimeResponse {
  export type AsObject = {
    arrivaltime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

export class GetRefreshArrivalTimeRequest extends jspb.Message {
  getSessiontoken(): string;
  setSessiontoken(value: string): GetRefreshArrivalTimeRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetRefreshArrivalTimeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetRefreshArrivalTimeRequest): GetRefreshArrivalTimeRequest.AsObject;
  static serializeBinaryToWriter(message: GetRefreshArrivalTimeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetRefreshArrivalTimeRequest;
  static deserializeBinaryFromReader(message: GetRefreshArrivalTimeRequest, reader: jspb.BinaryReader): GetRefreshArrivalTimeRequest;
}

export namespace GetRefreshArrivalTimeRequest {
  export type AsObject = {
    sessiontoken: string,
  }
}

export class GetRefreshArrivalTimeResponse extends jspb.Message {
  getDelayedtime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setDelayedtime(value?: google_protobuf_timestamp_pb.Timestamp): GetRefreshArrivalTimeResponse;
  hasDelayedtime(): boolean;
  clearDelayedtime(): GetRefreshArrivalTimeResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetRefreshArrivalTimeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetRefreshArrivalTimeResponse): GetRefreshArrivalTimeResponse.AsObject;
  static serializeBinaryToWriter(message: GetRefreshArrivalTimeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetRefreshArrivalTimeResponse;
  static deserializeBinaryFromReader(message: GetRefreshArrivalTimeResponse, reader: jspb.BinaryReader): GetRefreshArrivalTimeResponse;
}

export namespace GetRefreshArrivalTimeResponse {
  export type AsObject = {
    delayedtime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

export class UpdateSessionTokenRequest extends jspb.Message {
  getSessiontoken(): string;
  setSessiontoken(value: string): UpdateSessionTokenRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateSessionTokenRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateSessionTokenRequest): UpdateSessionTokenRequest.AsObject;
  static serializeBinaryToWriter(message: UpdateSessionTokenRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateSessionTokenRequest;
  static deserializeBinaryFromReader(message: UpdateSessionTokenRequest, reader: jspb.BinaryReader): UpdateSessionTokenRequest;
}

export namespace UpdateSessionTokenRequest {
  export type AsObject = {
    sessiontoken: string,
  }
}

export class UpdateSessionTokenResponse extends jspb.Message {
  getSessiontoken(): string;
  setSessiontoken(value: string): UpdateSessionTokenResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateSessionTokenResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateSessionTokenResponse): UpdateSessionTokenResponse.AsObject;
  static serializeBinaryToWriter(message: UpdateSessionTokenResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateSessionTokenResponse;
  static deserializeBinaryFromReader(message: UpdateSessionTokenResponse, reader: jspb.BinaryReader): UpdateSessionTokenResponse;
}

export namespace UpdateSessionTokenResponse {
  export type AsObject = {
    sessiontoken: string,
  }
}

export enum Exceptions { 
  INVALID_INPUT_EXCEPTION = 0,
  UNAUTHORIZED_USER_EXCEPTION = 1,
}
