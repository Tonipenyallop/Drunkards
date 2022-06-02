CREATE TABLE companies (
  "id" serial PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  "area" varchar(255) NOT NULL,
  "time" varchar(255) NOT NULL
);

INSERT INTO companies (name, area, time)
VALUES 
('FakeCompanyA', 'Takamatsu', '4-23'),
('FakeCompanyB', 'Takamatsu', '9-23'),
('FakeCompanyC', 'Takamatsu', '17-2'),
('FakeCompanyD', 'Takamatsu', '16-21'),
('FakeCompanyE', 'Takamatsu', '18-0'),
('FakeCompanyF', 'Takamatsu', '8-15'),
('FakeCompanyG', 'Takamatsu', '19-7'),
('FakeCompanyH', 'Takamatsu', '7-19'),
('FakeCompanyI', 'Takamatsu', '5-11'),
('FakeCompanyJ', 'Takamatsu', '0-10');