CREATE TABLE sessions (
  "id" serial PRIMARY KEY,
  "userId" varchar(255) NOT NULL,
  "sessionToken" varchar(255) NOT NULL
);

