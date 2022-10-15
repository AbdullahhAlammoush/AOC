-- create database AOC;
use AOC;

-- create table users(
-- id INT AUTO_INCREMENT NOT NULL,
-- first_name VARchar (50),
-- last_name VARchar (50),
-- password VARchar(255),
-- username VARchar(255) unique,
-- Primary key (id)
-- )


-- create table items(
-- id INT AUTO_INCREMENT NOT NULL,
-- name_of_item VARchar(255),
-- price VARchar(255),
-- owner_id INT,
-- item_image VARchar(255),
-- Primary key(id)

-- )

create table comments(
id INT AUTO_INCREMENT NOT NULL,
text VARchar(255),
item_id INT,
user_id INT,
Primary key(id)




)
-- drop table comments