// Original file: src/proto/index.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CancelReservationRequest as _index_CancelReservationRequest, CancelReservationRequest__Output as _index_CancelReservationRequest__Output } from '../index/CancelReservationRequest';
import type { CancelReservationResponse as _index_CancelReservationResponse, CancelReservationResponse__Output as _index_CancelReservationResponse__Output } from '../index/CancelReservationResponse';
import type { CreateReservationRequest as _index_CreateReservationRequest, CreateReservationRequest__Output as _index_CreateReservationRequest__Output } from '../index/CreateReservationRequest';
import type { CreateReservationResponse as _index_CreateReservationResponse, CreateReservationResponse__Output as _index_CreateReservationResponse__Output } from '../index/CreateReservationResponse';
import type { GetLatestReservationRequest as _index_GetLatestReservationRequest, GetLatestReservationRequest__Output as _index_GetLatestReservationRequest__Output } from '../index/GetLatestReservationRequest';
import type { GetLatestReservationResponse as _index_GetLatestReservationResponse, GetLatestReservationResponse__Output as _index_GetLatestReservationResponse__Output } from '../index/GetLatestReservationResponse';
import type { GetReservationRequest as _index_GetReservationRequest, GetReservationRequest__Output as _index_GetReservationRequest__Output } from '../index/GetReservationRequest';
import type { GetReservationResponse as _index_GetReservationResponse, GetReservationResponse__Output as _index_GetReservationResponse__Output } from '../index/GetReservationResponse';
import type { LoginRequest as _index_LoginRequest, LoginRequest__Output as _index_LoginRequest__Output } from '../index/LoginRequest';
import type { LoginResponse as _index_LoginResponse, LoginResponse__Output as _index_LoginResponse__Output } from '../index/LoginResponse';
import type { RegisterRequest as _index_RegisterRequest, RegisterRequest__Output as _index_RegisterRequest__Output } from '../index/RegisterRequest';
import type { RegisterResponse as _index_RegisterResponse, RegisterResponse__Output as _index_RegisterResponse__Output } from '../index/RegisterResponse';

export interface UserClient extends grpc.Client {
  CancelReservation(argument: _index_CancelReservationRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_index_CancelReservationResponse__Output>): grpc.ClientUnaryCall;
  CancelReservation(argument: _index_CancelReservationRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_index_CancelReservationResponse__Output>): grpc.ClientUnaryCall;
  CancelReservation(argument: _index_CancelReservationRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_index_CancelReservationResponse__Output>): grpc.ClientUnaryCall;
  CancelReservation(argument: _index_CancelReservationRequest, callback: grpc.requestCallback<_index_CancelReservationResponse__Output>): grpc.ClientUnaryCall;
  cancelReservation(argument: _index_CancelReservationRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_index_CancelReservationResponse__Output>): grpc.ClientUnaryCall;
  cancelReservation(argument: _index_CancelReservationRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_index_CancelReservationResponse__Output>): grpc.ClientUnaryCall;
  cancelReservation(argument: _index_CancelReservationRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_index_CancelReservationResponse__Output>): grpc.ClientUnaryCall;
  cancelReservation(argument: _index_CancelReservationRequest, callback: grpc.requestCallback<_index_CancelReservationResponse__Output>): grpc.ClientUnaryCall;
  
  CreateReservation(argument: _index_CreateReservationRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_index_CreateReservationResponse__Output>): grpc.ClientUnaryCall;
  CreateReservation(argument: _index_CreateReservationRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_index_CreateReservationResponse__Output>): grpc.ClientUnaryCall;
  CreateReservation(argument: _index_CreateReservationRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_index_CreateReservationResponse__Output>): grpc.ClientUnaryCall;
  CreateReservation(argument: _index_CreateReservationRequest, callback: grpc.requestCallback<_index_CreateReservationResponse__Output>): grpc.ClientUnaryCall;
  createReservation(argument: _index_CreateReservationRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_index_CreateReservationResponse__Output>): grpc.ClientUnaryCall;
  createReservation(argument: _index_CreateReservationRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_index_CreateReservationResponse__Output>): grpc.ClientUnaryCall;
  createReservation(argument: _index_CreateReservationRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_index_CreateReservationResponse__Output>): grpc.ClientUnaryCall;
  createReservation(argument: _index_CreateReservationRequest, callback: grpc.requestCallback<_index_CreateReservationResponse__Output>): grpc.ClientUnaryCall;
  
  GetLatestReservation(argument: _index_GetLatestReservationRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_index_GetLatestReservationResponse__Output>): grpc.ClientUnaryCall;
  GetLatestReservation(argument: _index_GetLatestReservationRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_index_GetLatestReservationResponse__Output>): grpc.ClientUnaryCall;
  GetLatestReservation(argument: _index_GetLatestReservationRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_index_GetLatestReservationResponse__Output>): grpc.ClientUnaryCall;
  GetLatestReservation(argument: _index_GetLatestReservationRequest, callback: grpc.requestCallback<_index_GetLatestReservationResponse__Output>): grpc.ClientUnaryCall;
  getLatestReservation(argument: _index_GetLatestReservationRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_index_GetLatestReservationResponse__Output>): grpc.ClientUnaryCall;
  getLatestReservation(argument: _index_GetLatestReservationRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_index_GetLatestReservationResponse__Output>): grpc.ClientUnaryCall;
  getLatestReservation(argument: _index_GetLatestReservationRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_index_GetLatestReservationResponse__Output>): grpc.ClientUnaryCall;
  getLatestReservation(argument: _index_GetLatestReservationRequest, callback: grpc.requestCallback<_index_GetLatestReservationResponse__Output>): grpc.ClientUnaryCall;
  
  GetReservation(argument: _index_GetReservationRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_index_GetReservationResponse__Output>): grpc.ClientUnaryCall;
  GetReservation(argument: _index_GetReservationRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_index_GetReservationResponse__Output>): grpc.ClientUnaryCall;
  GetReservation(argument: _index_GetReservationRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_index_GetReservationResponse__Output>): grpc.ClientUnaryCall;
  GetReservation(argument: _index_GetReservationRequest, callback: grpc.requestCallback<_index_GetReservationResponse__Output>): grpc.ClientUnaryCall;
  getReservation(argument: _index_GetReservationRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_index_GetReservationResponse__Output>): grpc.ClientUnaryCall;
  getReservation(argument: _index_GetReservationRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_index_GetReservationResponse__Output>): grpc.ClientUnaryCall;
  getReservation(argument: _index_GetReservationRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_index_GetReservationResponse__Output>): grpc.ClientUnaryCall;
  getReservation(argument: _index_GetReservationRequest, callback: grpc.requestCallback<_index_GetReservationResponse__Output>): grpc.ClientUnaryCall;
  
  Login(argument: _index_LoginRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_index_LoginResponse__Output>): grpc.ClientUnaryCall;
  Login(argument: _index_LoginRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_index_LoginResponse__Output>): grpc.ClientUnaryCall;
  Login(argument: _index_LoginRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_index_LoginResponse__Output>): grpc.ClientUnaryCall;
  Login(argument: _index_LoginRequest, callback: grpc.requestCallback<_index_LoginResponse__Output>): grpc.ClientUnaryCall;
  login(argument: _index_LoginRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_index_LoginResponse__Output>): grpc.ClientUnaryCall;
  login(argument: _index_LoginRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_index_LoginResponse__Output>): grpc.ClientUnaryCall;
  login(argument: _index_LoginRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_index_LoginResponse__Output>): grpc.ClientUnaryCall;
  login(argument: _index_LoginRequest, callback: grpc.requestCallback<_index_LoginResponse__Output>): grpc.ClientUnaryCall;
  
  Register(argument: _index_RegisterRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_index_RegisterResponse__Output>): grpc.ClientUnaryCall;
  Register(argument: _index_RegisterRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_index_RegisterResponse__Output>): grpc.ClientUnaryCall;
  Register(argument: _index_RegisterRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_index_RegisterResponse__Output>): grpc.ClientUnaryCall;
  Register(argument: _index_RegisterRequest, callback: grpc.requestCallback<_index_RegisterResponse__Output>): grpc.ClientUnaryCall;
  register(argument: _index_RegisterRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_index_RegisterResponse__Output>): grpc.ClientUnaryCall;
  register(argument: _index_RegisterRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_index_RegisterResponse__Output>): grpc.ClientUnaryCall;
  register(argument: _index_RegisterRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_index_RegisterResponse__Output>): grpc.ClientUnaryCall;
  register(argument: _index_RegisterRequest, callback: grpc.requestCallback<_index_RegisterResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface UserHandlers extends grpc.UntypedServiceImplementation {
  CancelReservation: grpc.handleUnaryCall<_index_CancelReservationRequest__Output, _index_CancelReservationResponse>;
  
  CreateReservation: grpc.handleUnaryCall<_index_CreateReservationRequest__Output, _index_CreateReservationResponse>;
  
  GetLatestReservation: grpc.handleUnaryCall<_index_GetLatestReservationRequest__Output, _index_GetLatestReservationResponse>;
  
  GetReservation: grpc.handleUnaryCall<_index_GetReservationRequest__Output, _index_GetReservationResponse>;
  
  Login: grpc.handleUnaryCall<_index_LoginRequest__Output, _index_LoginResponse>;
  
  Register: grpc.handleUnaryCall<_index_RegisterRequest__Output, _index_RegisterResponse>;
  
}

export interface UserDefinition extends grpc.ServiceDefinition {
  CancelReservation: MethodDefinition<_index_CancelReservationRequest, _index_CancelReservationResponse, _index_CancelReservationRequest__Output, _index_CancelReservationResponse__Output>
  CreateReservation: MethodDefinition<_index_CreateReservationRequest, _index_CreateReservationResponse, _index_CreateReservationRequest__Output, _index_CreateReservationResponse__Output>
  GetLatestReservation: MethodDefinition<_index_GetLatestReservationRequest, _index_GetLatestReservationResponse, _index_GetLatestReservationRequest__Output, _index_GetLatestReservationResponse__Output>
  GetReservation: MethodDefinition<_index_GetReservationRequest, _index_GetReservationResponse, _index_GetReservationRequest__Output, _index_GetReservationResponse__Output>
  Login: MethodDefinition<_index_LoginRequest, _index_LoginResponse, _index_LoginRequest__Output, _index_LoginResponse__Output>
  Register: MethodDefinition<_index_RegisterRequest, _index_RegisterResponse, _index_RegisterRequest__Output, _index_RegisterResponse__Output>
}
