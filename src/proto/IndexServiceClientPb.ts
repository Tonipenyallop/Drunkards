/**
 * @fileoverview gRPC-Web generated client stub for index
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as src_proto_index_pb from '../../src/proto/index_pb';


export class UserClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'binary';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodDescriptorLogin = new grpcWeb.MethodDescriptor(
    '/index.User/Login',
    grpcWeb.MethodType.UNARY,
    src_proto_index_pb.LoginRequest,
    src_proto_index_pb.LoginResponse,
    (request: src_proto_index_pb.LoginRequest) => {
      return request.serializeBinary();
    },
    src_proto_index_pb.LoginResponse.deserializeBinary
  );

  login(
    request: src_proto_index_pb.LoginRequest,
    metadata: grpcWeb.Metadata | null): Promise<src_proto_index_pb.LoginResponse>;

  login(
    request: src_proto_index_pb.LoginRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: src_proto_index_pb.LoginResponse) => void): grpcWeb.ClientReadableStream<src_proto_index_pb.LoginResponse>;

  login(
    request: src_proto_index_pb.LoginRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: src_proto_index_pb.LoginResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/index.User/Login',
        request,
        metadata || {},
        this.methodDescriptorLogin,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/index.User/Login',
    request,
    metadata || {},
    this.methodDescriptorLogin);
  }

  methodDescriptorRegister = new grpcWeb.MethodDescriptor(
    '/index.User/Register',
    grpcWeb.MethodType.UNARY,
    src_proto_index_pb.RegisterRequest,
    src_proto_index_pb.RegisterResponse,
    (request: src_proto_index_pb.RegisterRequest) => {
      return request.serializeBinary();
    },
    src_proto_index_pb.RegisterResponse.deserializeBinary
  );

  register(
    request: src_proto_index_pb.RegisterRequest,
    metadata: grpcWeb.Metadata | null): Promise<src_proto_index_pb.RegisterResponse>;

  register(
    request: src_proto_index_pb.RegisterRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: src_proto_index_pb.RegisterResponse) => void): grpcWeb.ClientReadableStream<src_proto_index_pb.RegisterResponse>;

  register(
    request: src_proto_index_pb.RegisterRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: src_proto_index_pb.RegisterResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/index.User/Register',
        request,
        metadata || {},
        this.methodDescriptorRegister,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/index.User/Register',
    request,
    metadata || {},
    this.methodDescriptorRegister);
  }

  methodDescriptorCreateReservation = new grpcWeb.MethodDescriptor(
    '/index.User/CreateReservation',
    grpcWeb.MethodType.UNARY,
    src_proto_index_pb.CreateReservationRequest,
    src_proto_index_pb.CreateReservationResponse,
    (request: src_proto_index_pb.CreateReservationRequest) => {
      return request.serializeBinary();
    },
    src_proto_index_pb.CreateReservationResponse.deserializeBinary
  );

  createReservation(
    request: src_proto_index_pb.CreateReservationRequest,
    metadata: grpcWeb.Metadata | null): Promise<src_proto_index_pb.CreateReservationResponse>;

  createReservation(
    request: src_proto_index_pb.CreateReservationRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: src_proto_index_pb.CreateReservationResponse) => void): grpcWeb.ClientReadableStream<src_proto_index_pb.CreateReservationResponse>;

  createReservation(
    request: src_proto_index_pb.CreateReservationRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: src_proto_index_pb.CreateReservationResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/index.User/CreateReservation',
        request,
        metadata || {},
        this.methodDescriptorCreateReservation,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/index.User/CreateReservation',
    request,
    metadata || {},
    this.methodDescriptorCreateReservation);
  }

  methodDescriptorGetReservation = new grpcWeb.MethodDescriptor(
    '/index.User/GetReservation',
    grpcWeb.MethodType.UNARY,
    src_proto_index_pb.GetReservationRequest,
    src_proto_index_pb.GetReservationResponse,
    (request: src_proto_index_pb.GetReservationRequest) => {
      return request.serializeBinary();
    },
    src_proto_index_pb.GetReservationResponse.deserializeBinary
  );

  getReservation(
    request: src_proto_index_pb.GetReservationRequest,
    metadata: grpcWeb.Metadata | null): Promise<src_proto_index_pb.GetReservationResponse>;

  getReservation(
    request: src_proto_index_pb.GetReservationRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: src_proto_index_pb.GetReservationResponse) => void): grpcWeb.ClientReadableStream<src_proto_index_pb.GetReservationResponse>;

  getReservation(
    request: src_proto_index_pb.GetReservationRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: src_proto_index_pb.GetReservationResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/index.User/GetReservation',
        request,
        metadata || {},
        this.methodDescriptorGetReservation,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/index.User/GetReservation',
    request,
    metadata || {},
    this.methodDescriptorGetReservation);
  }

  methodDescriptorCancelReservation = new grpcWeb.MethodDescriptor(
    '/index.User/CancelReservation',
    grpcWeb.MethodType.UNARY,
    src_proto_index_pb.CancelReservationRequest,
    src_proto_index_pb.CancelReservationResponse,
    (request: src_proto_index_pb.CancelReservationRequest) => {
      return request.serializeBinary();
    },
    src_proto_index_pb.CancelReservationResponse.deserializeBinary
  );

  cancelReservation(
    request: src_proto_index_pb.CancelReservationRequest,
    metadata: grpcWeb.Metadata | null): Promise<src_proto_index_pb.CancelReservationResponse>;

  cancelReservation(
    request: src_proto_index_pb.CancelReservationRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: src_proto_index_pb.CancelReservationResponse) => void): grpcWeb.ClientReadableStream<src_proto_index_pb.CancelReservationResponse>;

  cancelReservation(
    request: src_proto_index_pb.CancelReservationRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: src_proto_index_pb.CancelReservationResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/index.User/CancelReservation',
        request,
        metadata || {},
        this.methodDescriptorCancelReservation,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/index.User/CancelReservation',
    request,
    metadata || {},
    this.methodDescriptorCancelReservation);
  }

  methodDescriptorGetLatestReservation = new grpcWeb.MethodDescriptor(
    '/index.User/GetLatestReservation',
    grpcWeb.MethodType.UNARY,
    src_proto_index_pb.GetLatestReservationRequest,
    src_proto_index_pb.GetLatestReservationResponse,
    (request: src_proto_index_pb.GetLatestReservationRequest) => {
      return request.serializeBinary();
    },
    src_proto_index_pb.GetLatestReservationResponse.deserializeBinary
  );

  getLatestReservation(
    request: src_proto_index_pb.GetLatestReservationRequest,
    metadata: grpcWeb.Metadata | null): Promise<src_proto_index_pb.GetLatestReservationResponse>;

  getLatestReservation(
    request: src_proto_index_pb.GetLatestReservationRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: src_proto_index_pb.GetLatestReservationResponse) => void): grpcWeb.ClientReadableStream<src_proto_index_pb.GetLatestReservationResponse>;

  getLatestReservation(
    request: src_proto_index_pb.GetLatestReservationRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: src_proto_index_pb.GetLatestReservationResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/index.User/GetLatestReservation',
        request,
        metadata || {},
        this.methodDescriptorGetLatestReservation,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/index.User/GetLatestReservation',
    request,
    metadata || {},
    this.methodDescriptorGetLatestReservation);
  }

  methodDescriptorGetArrivalTime = new grpcWeb.MethodDescriptor(
    '/index.User/GetArrivalTime',
    grpcWeb.MethodType.UNARY,
    src_proto_index_pb.GetArrivalTimeRequest,
    src_proto_index_pb.GetArrivalTimeResponse,
    (request: src_proto_index_pb.GetArrivalTimeRequest) => {
      return request.serializeBinary();
    },
    src_proto_index_pb.GetArrivalTimeResponse.deserializeBinary
  );

  getArrivalTime(
    request: src_proto_index_pb.GetArrivalTimeRequest,
    metadata: grpcWeb.Metadata | null): Promise<src_proto_index_pb.GetArrivalTimeResponse>;

  getArrivalTime(
    request: src_proto_index_pb.GetArrivalTimeRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: src_proto_index_pb.GetArrivalTimeResponse) => void): grpcWeb.ClientReadableStream<src_proto_index_pb.GetArrivalTimeResponse>;

  getArrivalTime(
    request: src_proto_index_pb.GetArrivalTimeRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: src_proto_index_pb.GetArrivalTimeResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/index.User/GetArrivalTime',
        request,
        metadata || {},
        this.methodDescriptorGetArrivalTime,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/index.User/GetArrivalTime',
    request,
    metadata || {},
    this.methodDescriptorGetArrivalTime);
  }

  methodDescriptorGetRefreshArrivalTime = new grpcWeb.MethodDescriptor(
    '/index.User/GetRefreshArrivalTime',
    grpcWeb.MethodType.UNARY,
    src_proto_index_pb.GetRefreshArrivalTimeRequest,
    src_proto_index_pb.GetRefreshArrivalTimeResponse,
    (request: src_proto_index_pb.GetRefreshArrivalTimeRequest) => {
      return request.serializeBinary();
    },
    src_proto_index_pb.GetRefreshArrivalTimeResponse.deserializeBinary
  );

  getRefreshArrivalTime(
    request: src_proto_index_pb.GetRefreshArrivalTimeRequest,
    metadata: grpcWeb.Metadata | null): Promise<src_proto_index_pb.GetRefreshArrivalTimeResponse>;

  getRefreshArrivalTime(
    request: src_proto_index_pb.GetRefreshArrivalTimeRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: src_proto_index_pb.GetRefreshArrivalTimeResponse) => void): grpcWeb.ClientReadableStream<src_proto_index_pb.GetRefreshArrivalTimeResponse>;

  getRefreshArrivalTime(
    request: src_proto_index_pb.GetRefreshArrivalTimeRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: src_proto_index_pb.GetRefreshArrivalTimeResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/index.User/GetRefreshArrivalTime',
        request,
        metadata || {},
        this.methodDescriptorGetRefreshArrivalTime,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/index.User/GetRefreshArrivalTime',
    request,
    metadata || {},
    this.methodDescriptorGetRefreshArrivalTime);
  }

  methodDescriptorUpdateSessionToken = new grpcWeb.MethodDescriptor(
    '/index.User/UpdateSessionToken',
    grpcWeb.MethodType.UNARY,
    src_proto_index_pb.UpdateSessionTokenRequest,
    src_proto_index_pb.UpdateSessionTokenResponse,
    (request: src_proto_index_pb.UpdateSessionTokenRequest) => {
      return request.serializeBinary();
    },
    src_proto_index_pb.UpdateSessionTokenResponse.deserializeBinary
  );

  updateSessionToken(
    request: src_proto_index_pb.UpdateSessionTokenRequest,
    metadata: grpcWeb.Metadata | null): Promise<src_proto_index_pb.UpdateSessionTokenResponse>;

  updateSessionToken(
    request: src_proto_index_pb.UpdateSessionTokenRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: src_proto_index_pb.UpdateSessionTokenResponse) => void): grpcWeb.ClientReadableStream<src_proto_index_pb.UpdateSessionTokenResponse>;

  updateSessionToken(
    request: src_proto_index_pb.UpdateSessionTokenRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: src_proto_index_pb.UpdateSessionTokenResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/index.User/UpdateSessionToken',
        request,
        metadata || {},
        this.methodDescriptorUpdateSessionToken,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/index.User/UpdateSessionToken',
    request,
    metadata || {},
    this.methodDescriptorUpdateSessionToken);
  }

}

