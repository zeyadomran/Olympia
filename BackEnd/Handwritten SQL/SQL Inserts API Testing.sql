insert into employee (eId,branchId,email,phoneNum,dob,firstName,lastName,sex,eType,passwordHash) values (1,1,"email@host.ca","(123) 456-789","2077-12-12","Austin","Bond","M","Admin","$2b$12$bHop6pQFFJBG86NnXZUg4.s4DFAqwPyV5T34UrngmhyF7L66aJ4ZO");
-- Password is abc123

insert into employee (eId,branchId,email,phoneNum,dob,firstName,lastName,sex,eType,passwordHash) values (2,1,"email@host.ca","(123) 456-789","2077-12-12","Austin","Bond","M","Trainer","$2b$12$bHop6pQFFJBG86NnXZUg4.s4DFAqwPyV5T34UrngmhyF7L66aJ4ZO");
-- Password is 123abc
 
insert into client (clientId,email,phoneNum,dob,firstName,lastName,sex,memberType,price,startDate,endDate,passwordHash) values (1,"email123@gmail.com","(123) 456-789","2011-01-18","John","Doe","M","YEAR_PASS",12.00,"2012-12-12", "2022-12-12", "$2b$12$bHop6pQFFJBG86NnXZUg4.s4DFAqwPyV5T34UrngmhyF7L66aJ4ZO");
-- Password is abc123

insert into client (clientId,email,phoneNum,dob,firstName,lastName,sex,memberType,price,startDate,endDate,passwordHash) values (4,"email123@gmail.com","(123) 456-789","2011-01-18","John","Doe","M","YEAR_PASS",12.00,"2012-12-12", "2022-12-12", "$2b$12$bHop6pQFFJBG86NnXZUg4.s4DFAqwPyV5T34UrngmhyF7L66aJ4ZO");
-- Password is abc123

insert into gym_branch values (69,"asd","asd",69);

insert into gym_storage values (1,"Floor");
insert into gym_storage values (1,"Storage");

insert into equipment (eName,repairStatus,purchaseDate,branchId,storageType) values ("Bench-Press","F","2022-03-25",1,"Floor");
insert into equipment (eName,repairStatus,purchaseDate,branchId,storageType) values ("Dumbell","F","2022-03-25",1,"Storage");
insert into equipment (eName,repairStatus,purchaseDate,branchId,storageType) values ("Hack-Squat","F","2022-03-25",1,"Floor");
insert into equipment (eName,repairStatus,purchaseDate,branchId,storageType) values ("Barbell","F","2022-03-25",1,"Storage");

UPDATE equipment SET storageType = "Floor" WHERE eId = 2;

insert into manages values (1,1);

insert into reports (eId,clientId,issue,dateOfReport,curStatus) values (7,1,"Bad Support","2022-03-25",true);

DELETE FROM employee WHERE eId > 10000;
DELETE FROM client WHERE clientId > 10000;

insert into gym_branch (branchId,bName,bAddress,timeSlotCapacity) values (1,"Austin's Gym", "123 Avondale Rd. Okotoks AB", 85);

SELECT E.eId,E.branchId,E.email,E.phoneNum,DATE_FORMAT(E.dob,"%Y-%m-%d") as dob,E.firstName,E.lastName,E.sex,E.eType FROM employee AS E, manages AS M WHERE M.branchId = 1 AND M.eId = E.eId;

ALTER TABLE service ADD timeEnds time;

INSERT INTO day_schedule values (1,"2022-03-26");
INSERT INTO day_schedule values (1,"2022-03-27");
INSERT INTO day_schedule values (1,"2022-03-28");
INSERT INTO day_schedule values (1,"2022-03-29");
INSERT INTO day_schedule values (1,"2022-03-30");
INSERT INTO day_schedule values (1,"2022-03-31");
INSERT INTO day_schedule values (1,"2022-04-01");

INSERT INTO time_slot values (1,"2022-03-28","10:00");
INSERT INTO time_slot values (1,"2022-03-27","13:00");
INSERT INTO time_slot values (1,"2022-03-27","14:00");
INSERT INTO time_slot values (1,"2022-03-27","15:00");
INSERT INTO time_slot values (1,"2022-03-27","16:00");

INSERT INTO time_books values (4,1,"2022-03-26","16:00");
INSERT INTO time_books values (1,1,"2022-03-26","16:00");

INSERT INTO service (branchId,serviceName,timeOfService,timeEnds,daysOfService,capacity,description) values (1,"Parkour","12:00","13:00","MWF",50,"Hardcore");
INSERT INTO service (branchId,serviceName,timeOfService,timeEnds,daysOfService,capacity,description) values (1,"Yoga","10:00","13:00","TR",150,"Boring");
INSERT INTO service (branchId,serviceName,timeOfService,timeEnds,daysOfService,capacity,description) values (1,"new","10:00","13:00","TR",150,"Boring");

INSERT INTO service_books values (1,1,1,"2022-03-28");
INSERT INTO service_books values (1,2,1,"2022-03-29");
INSERT INTO service_books values (1,6,1,"2022-03-28");

Drop TABLE instructs;

CREATE TABLE INSTRUCTS (
	serviceId INT,
	eId INT,
	branchId INT,
	PRIMARY KEY (serviceId,eId,branchId),
	FOREIGN KEY (serviceId,branchId) REFERENCES Service(serviceId,branchId),
	FOREIGN KEY (eId) REFERENCES Employee(eId)
);
