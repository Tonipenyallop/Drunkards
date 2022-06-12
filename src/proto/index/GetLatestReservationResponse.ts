// Original file: src/proto/index.proto

import type { Reservation as _index_Reservation, Reservation__Output as _index_Reservation__Output } from '../index/Reservation';
import type { Long } from '@grpc/proto-loader';

export interface GetLatestReservationResponse {
  'latestReservation'?: (_index_Reservation | null);
  'estimatedTimeOnArrival'?: (number | string | Long);
}

export interface GetLatestReservationResponse__Output {
  'latestReservation': (_index_Reservation__Output | null);
  'estimatedTimeOnArrival': (string);
}
