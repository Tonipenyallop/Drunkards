import type * as grpc from '@grpc/grpc-js';
import type { EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import type { UserClient as _index_UserClient, UserDefinition as _index_UserDefinition } from './index/User';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  google: {
    protobuf: {
      Timestamp: MessageTypeDefinition
    }
  }
  index: {
    CancelReservationRequest: MessageTypeDefinition
    CancelReservationResponse: MessageTypeDefinition
    CreateReservationRequest: MessageTypeDefinition
    CreateReservationResponse: MessageTypeDefinition
    Exceptions: EnumTypeDefinition
    GetArrivalTimeRequest: MessageTypeDefinition
    GetArrivalTimeResponse: MessageTypeDefinition
    GetLatestReservationRequest: MessageTypeDefinition
    GetLatestReservationResponse: MessageTypeDefinition
    GetRefreshArrivalTimeRequest: MessageTypeDefinition
    GetRefreshArrivalTimeResponse: MessageTypeDefinition
    GetReservationRequest: MessageTypeDefinition
    GetReservationResponse: MessageTypeDefinition
    LoginRequest: MessageTypeDefinition
    LoginResponse: MessageTypeDefinition
    RegisterRequest: MessageTypeDefinition
    RegisterResponse: MessageTypeDefinition
    Reservation: MessageTypeDefinition
    UpdateSessionTokenRequest: MessageTypeDefinition
    UpdateSessionTokenResponse: MessageTypeDefinition
    User: SubtypeConstructor<typeof grpc.Client, _index_UserClient> & { service: _index_UserDefinition }
  }
}

