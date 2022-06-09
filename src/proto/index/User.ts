// Original file: src/proto/index.proto

import type * as grpc from "@grpc/grpc-js";
import type { MethodDefinition } from "@grpc/proto-loader";
import type {
  SuccessLogIn as _index_SuccessLogIn,
  SuccessLogIn__Output as _index_SuccessLogIn__Output,
} from "./SuccessLogIn";
import type {
  UserInfo as _index_UserInfo,
  UserInfo__Output as _index_UserInfo__Output,
} from "./UserInfo";

export interface UserClient extends grpc.Client {
  Login(
    argument: _index_UserInfo,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_index_SuccessLogIn__Output>
  ): grpc.ClientUnaryCall;
  Login(
    argument: _index_UserInfo,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_index_SuccessLogIn__Output>
  ): grpc.ClientUnaryCall;
  Login(
    argument: _index_UserInfo,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_index_SuccessLogIn__Output>
  ): grpc.ClientUnaryCall;
  Login(
    argument: _index_UserInfo,
    callback: grpc.requestCallback<_index_SuccessLogIn__Output>
  ): grpc.ClientUnaryCall;
  login(
    argument: _index_UserInfo,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_index_SuccessLogIn__Output>
  ): grpc.ClientUnaryCall;
  login(
    argument: _index_UserInfo,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_index_SuccessLogIn__Output>
  ): grpc.ClientUnaryCall;
  login(
    argument: _index_UserInfo,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_index_SuccessLogIn__Output>
  ): grpc.ClientUnaryCall;
  login(
    argument: _index_UserInfo,
    callback: grpc.requestCallback<_index_SuccessLogIn__Output>
  ): grpc.ClientUnaryCall;
}

export interface UserHandlers extends grpc.UntypedServiceImplementation {
  Login: grpc.handleUnaryCall<_index_UserInfo__Output, _index_SuccessLogIn>;
}

export interface UserDefinition extends grpc.ServiceDefinition {
  Login: MethodDefinition<
    _index_UserInfo,
    _index_SuccessLogIn,
    _index_UserInfo__Output,
    _index_SuccessLogIn__Output
  >;
}
