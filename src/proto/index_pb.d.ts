import * as jspb from 'google-protobuf'



export class UserInfo extends jspb.Message {
  getName(): string;
  setName(value: string): UserInfo;

  getPassword(): string;
  setPassword(value: string): UserInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserInfo.AsObject;
  static toObject(includeInstance: boolean, msg: UserInfo): UserInfo.AsObject;
  static serializeBinaryToWriter(message: UserInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserInfo;
  static deserializeBinaryFromReader(message: UserInfo, reader: jspb.BinaryReader): UserInfo;
}

export namespace UserInfo {
  export type AsObject = {
    name: string,
    password: string,
  }
}

export class SuccessLogIn extends jspb.Message {
  getIssuccess(): boolean;
  setIssuccess(value: boolean): SuccessLogIn;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SuccessLogIn.AsObject;
  static toObject(includeInstance: boolean, msg: SuccessLogIn): SuccessLogIn.AsObject;
  static serializeBinaryToWriter(message: SuccessLogIn, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SuccessLogIn;
  static deserializeBinaryFromReader(message: SuccessLogIn, reader: jspb.BinaryReader): SuccessLogIn;
}

export namespace SuccessLogIn {
  export type AsObject = {
    issuccess: boolean,
  }
}

