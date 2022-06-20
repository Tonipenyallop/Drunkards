# GRPC Service

## API specification

### Register
input: 
* RegisterRequest
  * username : string - unique username for identifying the new account
  * password : string - unique password for the new account

output:
* RegisterResponse
  * sessionToken : string - unique identifier for current user's login session

### CreateReservation
input:
* CreateReservationRequest
  * startLocation : string 
  * destination : string
  * pickupTime : Timestamp
  * sessionToken : string

output:
* CreateReservationResponse
  * 

### GetReservation
input:
* GetReservationRequest
  * sessionToken : string

output:
* GetReservationResponse
  *  reservations : repeated Reservation

### CancelReservation
input:
* CancelReservationRequest 
  * reservationID : string
  * sessionToken : string

output:
* CancelReservationResponse 
  * 

### GetLatestReservation
input:
* GetLatestReservationRequest
  * sessionToken : string

output:
* GetLatestReservationResponse
  * latestReservation : Reservation
  * estimatedTimeOnArrival : Timestamp

### GetArrivalTime
input:
* GetArrivalTimeRequest
  * sessionToken : string

output:
* GetArrivalTimeResponse
  * arrivalTime : Timestamp
 
