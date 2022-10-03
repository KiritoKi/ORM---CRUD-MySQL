CREATE DATABASE db_faculdade;

CREATE TABLE Person(
	registration integer NOT NULL AUTO_INCREMENT,
	name varchar(100),
	address varchar(100),
	birthday_date varchar(10),
	CONSTRAINT Person_pk PRIMARY KEY (registration)
);


CREATE TABLE Teacher(
	ID_teacher integer NOT NULL AUTO_INCREMENT,
	graduation varchar(100),
	salary double,
	ID_registration integer,
	CONSTRAINT Teacher_pk PRIMARY KEY (ID_teacher)
);

CREATE TABLE Student(
	ID_student integer NOT NULL AUTO_INCREMENT,
	course varchar(60),
	registration_student integer,
	ID_registration integer,
	CONSTRAINT Student_pk PRIMARY KEY (ID_student)
);

ALTER TABLE Teacher ADD CONSTRAINT ID_person FOREIGN KEY (ID_registration)
REFERENCES Person (registration) MATCH SIMPLE
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE Student ADD CONSTRAINT ID_person_stu FOREIGN KEY (ID_registration)
REFERENCES Person (registration) MATCH SIMPLE
ON DELETE CASCADE ON UPDATE CASCADE;

SET @count =0;

UPDATE Person SET Person.registration = @count:=@count+1;


