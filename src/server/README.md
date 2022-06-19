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
