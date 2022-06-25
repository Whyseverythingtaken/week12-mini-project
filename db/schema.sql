DROP DATABASE IF EXISTS the_best_database;
CREATE DATABASE the_best_database;

USE the_best_database;

CREATE TABLE movies (
  id INT NOT NULL AUTO_INCREMENT,
  movie_name VARCHAR(100),
  PRIMARY KEY (id)
);

CREATE TABLE reviews (
  id INT NOT NULL AUTO_INCREMENT,
  movie_id INT,
  review TEXT,
  PRIMARY KEY (id),
  FOREIGN KEY (movie_id)
  REFERENCES movies(id)
  ON DELETE SET NULL
);

