create schema olympiadb;
use olympiadb;

CREATE TABLE Client (
	clientId INT PRIMARY KEY auto_increment,
	email VARCHAR(255),
	phoneNum VARCHAR(255),
	dob DATE,
	firstName VARCHAR(255),
	lastName VARCHAR(255),
	sex CHAR(1),
	memberType VARCHAR(255),
	price FLOAT,
	startDate DATE,
	endDate DATE,
	passwordHash VARCHAR(300)
);

CREATE TABLE Gym_Branch (
	branchId INT PRIMARY KEY auto_increment,
	bName VARCHAR(255),
	bAddress VARCHAR(255),
	timeSlotCapacity INT UNSIGNED
);

CREATE TABLE Day_Schedule (
	branchId INT,
	dateOfBooking DATE,
	PRIMARY KEY (branchId, dateOfBooking),
	FOREIGN KEY (branchId) REFERENCES Gym_Branch(branchId)
);

CREATE TABLE Time_Slot (
	branchId INT,
	dateOfBooking DATE,
	timeOfBooking TIME,
	PRIMARY KEY (branchId, dateOfBooking, timeOfBooking),
	FOREIGN KEY (branchId,dateOfBooking) REFERENCES Day_Schedule(branchId,dateOfBooking)
);

CREATE TABLE Time_Books (
	clientId INT,
	branchId INT,
	dateOfBooking date,
	timeOfBooking TIME,
	PRIMARY KEY(
		clientId,
		branchId,
		dateOfBooking,
		timeOfBooking
	),
	FOREIGN KEY (clientId) REFERENCES Client(clientId),
	FOREIGN KEY (branchId,dateOfBooking,timeOfBooking) REFERENCES Time_Slot(branchId,dateOfBooking,timeOfBooking)
);

CREATE TABLE Client_Gym (
	branchId INT,
	clientId INT,
	PRIMARY KEY (branchId, clientId),
	FOREIGN KEY (branchId) REFERENCES Gym_Branch(branchId),
	FOREIGN KEY (clientId) REFERENCES Client(clientId)
);

CREATE TABLE Gym_Storage (
	branchId INT,
	storageType VARCHAR(255),
	PRIMARY KEY(branchId, storageType),
	FOREIGN KEY (branchId) REFERENCES Gym_Branch(branchId)
);

CREATE TABLE Equipment (
	eId INT PRIMARY KEY auto_increment,
	eName VARCHAR(255),
	repairStatus CHAR(1),
	purchaseDate DATE,
	branchId INT,
	storageType VARCHAR(255),
	FOREIGN KEY (branchId, storageType) REFERENCES Gym_Storage(branchId, storageType)
);

CREATE TABLE Reports (
	eId INT,
	clientId INT,
	issue VARCHAR(1024),
	dateOfReport DATE,
	curStatus bool,
	PRIMARY KEY (eId, clientId),
	FOREIGN KEY (eId) REFERENCES Equipment(eId),
	FOREIGN KEY (clientId) REFERENCES Client(clientId)
);

CREATE TABLE Employee (
	eId INT PRIMARY KEY auto_increment,
	branchId INT,
	email VARCHAR(255),
	phoneNum VARCHAR(255),
	dob DATE,
	firstName VARCHAR(255),
	lastName VARCHAR(255),
	sex CHAR(1),
	eType VARCHAR(255),
	passwordHash VARCHAR(300),
	FOREIGN KEY (branchId) REFERENCES Gym_Branch(branchId)
);

CREATE TABLE Manages (
	branchId INT,
	eId INT,
	PRIMARY KEY (branchId, eId),
	FOREIGN KEY (branchId) REFERENCES Gym_Branch(branchId),
	FOREIGN KEY (eId) REFERENCES Employee(eId)
);

CREATE TABLE Service (
	serviceId INT auto_increment,
	branchId INT,
	serviceName VARCHAR(255),
	timeOfService time,
	timeEnds time,
	daysOfService VARCHAR(255),
	capacity INT,
	description text,
	PRIMARY KEY (serviceId,branchId),
	FOREIGN KEY (branchId) REFERENCES Gym_Branch(branchId)
);

CREATE TABLE INSTRUCTS (
	serviceId INT,
	eId INT,
	branchId INT,
	PRIMARY KEY (serviceId,eId,branchId),
	FOREIGN KEY (serviceId,branchId) REFERENCES Service(serviceId,branchId),
	FOREIGN KEY (eId) REFERENCES Employee(eId)
);

CREATE TABLE Service_BOOKS (
	branchId INT,
	serviceId INT,
	clientId INT,
	dateOfBooking date,
	PRIMARY KEY (branchId, serviceId, clientId, dateOfBooking),
	FOREIGN KEY (branchId) REFERENCES Gym_Branch(branchId),
	FOREIGN KEY (serviceId) REFERENCES Service(serviceId),
	FOREIGN KEY (clientId) REFERENCES CLIENT(clientId)
);

ALTER TABLE Client AUTO_INCREMENT=10001;
ALTER TABLE Employee AUTO_INCREMENT=10001;