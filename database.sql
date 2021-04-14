-- CREATE DATABASE url_shortener;

CREATE TABLE urls(
  slug_id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE,
  url VARCHAR(255)
);
-- CREATE TABLE urls(slug_id SERIAL PRIMARY KEY,slug VARCHAR(255) UNIQUE,url VARCHAR(255));
CREATE TABLE users(
  u_id SERIAL PRIMARY KEY,
  username VARCHAR(255),  
  email VARCHAR(255) UNIQUE,
  password VARCHAR(300)
);

--CREATE TABLE users(u_id SERIAL PRIMARY KEY, username VARCHAR(255), email VARCHAR(255) UNIQUE, password VARCHAR(300));
