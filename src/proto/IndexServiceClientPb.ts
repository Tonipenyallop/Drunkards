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
    src_proto_index_pb.UserInfo,
    src_proto_index_pb.SuccessLogIn,
    (request: src_proto_index_pb.UserInfo) => {
      return request.serializeBinary();
    },
    src_proto_index_pb.SuccessLogIn.deserializeBinary
  );

  login(
    request: src_proto_index_pb.UserInfo,
    metadata: grpcWeb.Metadata | null): Promise<src_proto_index_pb.SuccessLogIn>;

  login(
    request: src_proto_index_pb.UserInfo,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: src_proto_index_pb.SuccessLogIn) => void): grpcWeb.ClientReadableStream<src_proto_index_pb.SuccessLogIn>;

  login(
    request: src_proto_index_pb.UserInfo,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: src_proto_index_pb.SuccessLogIn) => void) {
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

}

