// Original file: src/proto/index.proto

import type { Long } from '@grpc/proto-loader';

export interface CancelReservationRequest {
  'reservationID'?: (number | string | Long);
  'sessionToken'?: (string);
}

export interface CancelReservationRequest__Output {
  'reservationID': (string);
  'sessionToken': (string);
}
