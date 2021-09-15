DROP DATABASE IF EXISTS heroku_7f9386cb73c4b56;

CREATE DATABASE heroku_7f9386cb73c4b56;

USE heroku_7f9386cb73c4b56;

CREATE TABLE users (
  id INT(5) NOT NULL AUTO_INCREMENT,
  name VARCHAR(20),
  PRIMARY KEY (id)
);

CREATE TABLE sessions (
  id INT(5) NOT NULL AUTO_INCREMENT,
  user_id INT(5),
  date VARCHAR(20),
  start_time VARCHAR(20),
  end_time VARCHAR(20),
  duration_seconds INT(5),
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE goals (
  id INT(5) NOT NULL AUTO_INCREMENT,
  user_id INT(5),
  goal_minutes INT(5),
  createdAt VARCHAR(60),
  completed VARCHAR(20) DEFAULT 'false',
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < schema.sql
 *  to create the database and the tables.*/
