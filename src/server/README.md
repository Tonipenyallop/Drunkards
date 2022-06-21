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
  * startLocation : string - the location a user to be picked up 
  * destination : string - the location a user would love to go
  * pickupTime : Timestamp - the time a user to be at the destination
  * sessionToken : string - unique identifier for current user's login session

output:
* CreateReservationResponse
  * 

### GetReservation
input:
* GetReservationRequest
  * sessionToken : string - unique identifier for current user's login session

output:
* GetReservationResponse
  *  reservations : repeated Reservation - the list of Reservation objects which contains startLocation, destination, pickupTime and reservationID

### CancelReservation
input:
* CancelReservationRequest 
  * reservationID : string - unique identifier for updating current user's request
  * sessionToken : string - unique identifier for current user's login session

output:
* CancelReservationResponse 
  * 

### GetArrivalTime
input:
* GetArrivalTimeRequest
  * sessionToken : string - unique identifier for current user's login session

output:
* GetArrivalTimeResponse
  * arrivalTime : Timestamp - the time a user would love to be at destination
 
