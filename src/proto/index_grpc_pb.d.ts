// package: index
// file: src/proto/index.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as src_proto_index_pb from "../../src/proto/index_pb";

interface IUserService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    login: IUserService_ILogin;
}

interface IUserService_ILogin extends grpc.MethodDefinition<src_proto_index_pb.UserInfo, src_proto_index_pb.SuccessLogIn> {
    path: "/index.User/Login";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<src_proto_index_pb.UserInfo>;
    requestDeserialize: grpc.deserialize<src_proto_index_pb.UserInfo>;
    responseSerialize: grpc.serialize<src_proto_index_pb.SuccessLogIn>;
    responseDeserialize: grpc.deserialize<src_proto_index_pb.SuccessLogIn>;
}

export const UserService: IUserService;

export interface IUserServer {
    login: grpc.handleUnaryCall<src_proto_index_pb.UserInfo, src_proto_index_pb.SuccessLogIn>;
}

export interface IUserClient {
    login(request: src_proto_index_pb.UserInfo, callback: (error: grpc.ServiceError | null, response: src_proto_index_pb.SuccessLogIn) => void): grpc.ClientUnaryCall;
    login(request: src_proto_index_pb.UserInfo, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: src_proto_index_pb.SuccessLogIn) => void): grpc.ClientUnaryCall;
    login(request: src_proto_index_pb.UserInfo, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: src_proto_index_pb.SuccessLogIn) => void): grpc.ClientUnaryCall;
}

export class UserClient extends grpc.Client implements IUserClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public login(request: src_proto_index_pb.UserInfo, callback: (error: grpc.ServiceError | null, response: src_proto_index_pb.SuccessLogIn) => void): grpc.ClientUnaryCall;
    public login(request: src_proto_index_pb.UserInfo, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: src_proto_index_pb.SuccessLogIn) => void): grpc.ClientUnaryCall;
    public login(request: src_proto_index_pb.UserInfo, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: src_proto_index_pb.SuccessLogIn) => void): grpc.ClientUnaryCall;
}
