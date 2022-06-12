import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { UserClient as _index_UserClient, UserDefinition as _index_UserDefinition } from './index/User';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  index: {
    CancelReservationRequest: MessageTypeDefinition
    CancelReservationResponse: MessageTypeDefinition
    CreateReservationRequest: MessageTypeDefinition
    CreateReservationResponse: MessageTypeDefinition
    Exceptions: MessageTypeDefinition
    GetLatestReservationRequest: MessageTypeDefinition
    GetLatestReservationResponse: MessageTypeDefinition
    GetReservationRequest: MessageTypeDefinition
    GetReservationResponse: MessageTypeDefinition
    LoginRequest: MessageTypeDefinition
    LoginResponse: MessageTypeDefinition
    RegisterRequest: MessageTypeDefinition
    RegisterResponse: MessageTypeDefinition
    Reservation: MessageTypeDefinition
    User: SubtypeConstructor<typeof grpc.Client, _index_UserClient> & { service: _index_UserDefinition }
  }
}

