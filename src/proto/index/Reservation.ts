// Original file: src/proto/index.proto

import type { Timestamp as _google_protobuf_Timestamp, Timestamp__Output as _google_protobuf_Timestamp__Output } from '../google/protobuf/Timestamp';

export interface Reservation {
  'startLocation'?: (string);
  'destination'?: (string);
  'pickupTime'?: (_google_protobuf_Timestamp | null);
  'reservationID'?: (string);
}

export interface Reservation__Output {
  'startLocation': (string);
  'destination': (string);
  'pickupTime': (_google_protobuf_Timestamp__Output | null);
  'reservationID': (string);
}
