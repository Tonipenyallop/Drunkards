// Original file: src/proto/index.proto

import type { Timestamp as _google_protobuf_Timestamp, Timestamp__Output as _google_protobuf_Timestamp__Output } from '../google/protobuf/Timestamp';

export interface CreateReservationRequest {
  'startLocation'?: (string);
  'destination'?: (string);
  'pickupTime'?: (_google_protobuf_Timestamp | null);
  'sessionToken'?: (string);
}

export interface CreateReservationRequest__Output {
  'startLocation': (string);
  'destination': (string);
  'pickupTime': (_google_protobuf_Timestamp__Output | null);
  'sessionToken': (string);
}
