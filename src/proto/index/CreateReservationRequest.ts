// Original file: src/proto/index.proto

import type { Long } from '@grpc/proto-loader';

export interface CreateReservationRequest {
  'startLocation'?: (string);
  'destination'?: (string);
  'pickupTime'?: (number | string | Long);
  'sessionToken'?: (string);
}

export interface CreateReservationRequest__Output {
  'startLocation': (string);
  'destination': (string);
  'pickupTime': (string);
  'sessionToken': (string);
}
