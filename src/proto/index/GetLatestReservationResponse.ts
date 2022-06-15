// Original file: src/proto/index.proto

import type { Reservation as _index_Reservation, Reservation__Output as _index_Reservation__Output } from '../index/Reservation';
import type { Timestamp as _google_protobuf_Timestamp, Timestamp__Output as _google_protobuf_Timestamp__Output } from '../google/protobuf/Timestamp';

export interface GetLatestReservationResponse {
  'latestReservation'?: (_index_Reservation | null);
  'estimatedTimeOnArrival'?: (_google_protobuf_Timestamp | null);
}

export interface GetLatestReservationResponse__Output {
  'latestReservation': (_index_Reservation__Output | null);
  'estimatedTimeOnArrival': (_google_protobuf_Timestamp__Output | null);
}
