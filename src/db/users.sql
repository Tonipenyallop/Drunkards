CREATE TABLE users (
  "id" serial PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  "password" varchar(255) NOT NULL
);

INSERT INTO users (name, password)
VALUES 
('Toni', 'tonisuperamazing' ),
('Dragon', '123d'),
('Jojo', 'jojojojo' )
