// Original file: src/proto/index.proto

import type { Long } from '@grpc/proto-loader';

export interface Reservation {
  'startLocation'?: (string);
  'destination'?: (string);
  'pickupTime'?: (number | string | Long);
  'reservationID'?: (number | string | Long);
}

export interface Reservation__Output {
  'startLocation': (string);
  'destination': (string);
  'pickupTime': (string);
  'reservationID': (string);
}
