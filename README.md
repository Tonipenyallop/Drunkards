# Drunkards

## Overview
This is the application for calling uber. The login or register the account. After the user login, the user will be able to request the car on specific area and specific time. Then you will see the estimated time of arrival and it will keep updated every one minute. The user also can see the all the history of requests. The user can cancel the car-request as well.




# What I learnt
For this project, I have learnt how to design APIs as well as how to use gRPC. At first I was trying to use gRPC with Go since I was eager to challenge myself and finish this assignment. However, learning gRPC and Go simultaneously was really tough especially in limited time period. For that reason, after one week past from the day I started this project, I switched to use Node server and I have learnt how to use gRPC. Especially the type of gRPC Objects as well as how to write and build protobuffer code. 

## Instructions
In order to run this app, please run these commands below

.env file configuration
  * Change "NAME_OF_YOUR_POSTGRESQL_DATABASE" to your postgresql name
  * If you are new to postgresql, click [here](https://www.postgresql.org/docs/current/tutorial-start.html)
```
DB_USER=NAME_OF_YOUR_POSTGRESQL_DATABASE
```

Initiate node server
```
npm run webserver
```

Run the grpc server
```
npm run server
```

Run the react app
```
npm start
```

Migrate database
```
npx knex migrate:latest
```
If you want to seed the database
```
npx knex seed:run   
```


