CREATE DATABASE  IF NOT EXISTS `olympiadb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `olympiadb`;
-- MySQL dump 10.13  Distrib 8.0.28, for macos11 (x86_64)
--
-- Host: 127.0.0.1    Database: olympiadb
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client` (
  `clientId` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `phoneNum` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `sex` char(1) DEFAULT NULL,
  `memberType` varchar(255) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `passwordHash` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`clientId`)
) ENGINE=InnoDB AUTO_INCREMENT=345568005 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
INSERT INTO `client` VALUES (1,'starLordRox@hotmail.com','(123) 456-789','1988-12-28','John','Doe','M','YEAR_PASS',12,'2012-12-12','2022-12-12','$2b$12$bHop6pQFFJBG86NnXZUg4.s4DFAqwPyV5T34UrngmhyF7L66aJ4ZO'),(345567995,'brad1983@yahoo.com','870-710-1373','1977-04-30','Arline','Hogan','F','3 Months',150,'2022-04-02','2022-07-02','$2b$12$bHop6pQFFJBG86NnXZUg4.XFeqOIROlAqOTsyS176LWTOXXPwRVLG'),(345567996,'ignatius1983@gmail.com','619-743-6479','1956-10-31','Janet','Good','F','6 Months',120,'2021-08-25','2022-02-25','$2b$12$bHop6pQFFJBG86NnXZUg4.XFeqOIROlAqOTsyS176LWTOXXPwRVLG'),(345567997,'jasmin2014@hotmail.com','318-771-4884','1995-02-07','Cristina','Townsend','F','12 Months',110,'2021-05-06','2022-05-06','$2b$12$bHop6pQFFJBG86NnXZUg4.XFeqOIROlAqOTsyS176LWTOXXPwRVLG'),(345567998,'mclaughl@yahorobb_o.com','520-248-6117','1996-04-07','Maria','Moore','F','24 Months',100,'2020-03-22','2022-03-22','$2b$12$bHop6pQFFJBG86NnXZUg4.XFeqOIROlAqOTsyS176LWTOXXPwRVLG'),(345567999,'alisha1987@yahoo.com','614-817-9440','1980-07-28','Pamela','Parks','F','18 Months',115,'2021-05-31','2022-11-30','$2b$12$bHop6pQFFJBG86NnXZUg4.XFeqOIROlAqOTsyS176LWTOXXPwRVLG'),(345568000,'jordi2001@gmail.com','605-545-9393','1969-11-27','Billy','Becker','M','12 Months',110,'2021-08-23','2022-08-23','$2b$12$bHop6pQFFJBG86NnXZUg4.XFeqOIROlAqOTsyS176LWTOXXPwRVLG'),(345568001,'joan_skile8@gmail.com','601-201-9933','1970-10-28','Christian','Stover','M','18 Months',115,'2021-05-31','2022-11-30','$2b$12$bHop6pQFFJBG86NnXZUg4.XFeqOIROlAqOTsyS176LWTOXXPwRVLG'),(345568002,'brenden.jakubows@yahoo.com','425-326-3266','1981-06-08','Ron','Marshall','M','6 Months',120,'2022-01-02','2022-07-02','$2b$12$bHop6pQFFJBG86NnXZUg4.XFeqOIROlAqOTsyS176LWTOXXPwRVLG'),(345568003,'ethelyn_rya5@hotmail.com','847-203-7693','1970-05-20','Jerrod','Wyatt','M','3 Months',150,'2022-03-21','2022-06-21','$2b$12$bHop6pQFFJBG86NnXZUg4.XFeqOIROlAqOTsyS176LWTOXXPwRVLG'),(345568004,'gilberto.volkm@gmail.com','402-415-7412','1922-02-08','Wayne','Rose','M','24 Months',100,'2021-09-24','2023-09-24','$2b$12$bHop6pQFFJBG86NnXZUg4.XFeqOIROlAqOTsyS176LWTOXXPwRVLG');
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client_gym`
--

DROP TABLE IF EXISTS `client_gym`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client_gym` (
  `branchId` int NOT NULL,
  `clientId` int NOT NULL,
  PRIMARY KEY (`branchId`,`clientId`),
  KEY `clientId` (`clientId`),
  CONSTRAINT `client_gym_ibfk_1` FOREIGN KEY (`branchId`) REFERENCES `gym_branch` (`branchId`),
  CONSTRAINT `client_gym_ibfk_2` FOREIGN KEY (`clientId`) REFERENCES `client` (`clientId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client_gym`
--

LOCK TABLES `client_gym` WRITE;
/*!40000 ALTER TABLE `client_gym` DISABLE KEYS */;
/*!40000 ALTER TABLE `client_gym` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `day_schedule`
--

DROP TABLE IF EXISTS `day_schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `day_schedule` (
  `branchId` int NOT NULL,
  `dateOfBooking` date NOT NULL,
  PRIMARY KEY (`branchId`,`dateOfBooking`),
  CONSTRAINT `day_schedule_ibfk_1` FOREIGN KEY (`branchId`) REFERENCES `gym_branch` (`branchId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `day_schedule`
--

LOCK TABLES `day_schedule` WRITE;
/*!40000 ALTER TABLE `day_schedule` DISABLE KEYS */;
INSERT INTO `day_schedule` VALUES (1,'2022-04-11'),(1,'2022-04-12'),(1,'2022-04-13'),(1,'2022-04-14'),(1,'2022-04-15'),(1,'2022-04-16'),(1,'2022-04-17');
/*!40000 ALTER TABLE `day_schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `eId` int NOT NULL AUTO_INCREMENT,
  `branchId` int DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phoneNum` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `sex` char(1) DEFAULT NULL,
  `eType` varchar(255) DEFAULT NULL,
  `passwordHash` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`eId`),
  KEY `branchId` (`branchId`),
  CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`branchId`) REFERENCES `gym_branch` (`branchId`)
) ENGINE=InnoDB AUTO_INCREMENT=10030 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (10020,1,'elinore_schust@yahoo.com','317-760-8662','1986-03-24','Virgil','Thompson','M','Trainer','$2b$12$bHop6pQFFJBG86NnXZUg4.XFeqOIROlAqOTsyS176LWTOXXPwRVLG'),(10021,2,'alayna1977@gmail.com','781-414-5489','2000-04-27','Tyrone','Fenner','M','Admin','$2b$12$bHop6pQFFJBG86NnXZUg4.XFeqOIROlAqOTsyS176LWTOXXPwRVLG'),(10022,3,'raven_schoe8@yahoo.com','203-850-4795','1991-09-07','Colin','Barnett','M','Admin','$2b$12$bHop6pQFFJBG86NnXZUg4.XFeqOIROlAqOTsyS176LWTOXXPwRVLG'),(10023,4,'alysha1985@hotmail.com','619-912-9771','1957-01-26','Gene','Ross','M',NULL,'$2b$12$bHop6pQFFJBG86NnXZUg4.XFeqOIROlAqOTsyS176LWTOXXPwRVLG'),(10024,1,'emilio.jenk4@hotmail.com','214-552-5085','1996-02-01','Alton','Winkler','M','Admin','$2b$12$bHop6pQFFJBG86NnXZUg4.XFeqOIROlAqOTsyS176LWTOXXPwRVLG'),(10025,2,'garrick_fad@gmail.com','509-701-1624','1978-04-14','Ava','Guajardo','F',NULL,'$2b$12$bHop6pQFFJBG86NnXZUg4.XFeqOIROlAqOTsyS176LWTOXXPwRVLG'),(10026,3,'travis1989@hotmail.com','615-200-5002','1971-10-16','Erin','Peterman','F','Admin','$2b$12$bHop6pQFFJBG86NnXZUg4.XFeqOIROlAqOTsyS176LWTOXXPwRVLG'),(10027,4,'heloise.gutkows@yahoo.com','475-201-4682','1983-10-19','Kelli','Metcalf','F','Admin','$2b$12$bHop6pQFFJBG86NnXZUg4.XFeqOIROlAqOTsyS176LWTOXXPwRVLG'),(10028,1,'noemi.saway9@gmail.com','920-819-9162','2000-07-27','Eva','Yarbrough','F','Trainer','$2b$12$bHop6pQFFJBG86NnXZUg4.XFeqOIROlAqOTsyS176LWTOXXPwRVLG'),(10029,2,'willa.pauce7@gmail.com','209-485-6260','1970-03-17','Sandy','Hayes','F',NULL,'$2b$12$bHop6pQFFJBG86NnXZUg4.XFeqOIROlAqOTsyS176LWTOXXPwRVLG$2b$12$bHop6pQFFJBG86NnXZUg4.XFeqOIROlAqOTsyS176LWTOXXPwRVLG$2b$12$bHop6pQFFJBG86NnXZUg4.XFeqOIROlAqOTsyS176LWTOXXPwRVLG');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipment`
--

DROP TABLE IF EXISTS `equipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipment` (
  `eId` int NOT NULL AUTO_INCREMENT,
  `eName` varchar(255) DEFAULT NULL,
  `repairStatus` char(1) DEFAULT NULL,
  `purchaseDate` date DEFAULT NULL,
  `branchId` int DEFAULT NULL,
  `storageType` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`eId`),
  KEY `branchId` (`branchId`,`storageType`),
  CONSTRAINT `equipment_ibfk_1` FOREIGN KEY (`branchId`, `storageType`) REFERENCES `gym_storage` (`branchId`, `storageType`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipment`
--

LOCK TABLES `equipment` WRITE;
/*!40000 ALTER TABLE `equipment` DISABLE KEYS */;
INSERT INTO `equipment` VALUES (2,'Bench-Press','F','2022-03-25',1,'Floor'),(3,'Dumbell','F','2022-03-25',1,'Storage'),(4,'Hack-Squat','F','2022-03-25',1,'Floor'),(5,'Barbell','F','2022-03-25',1,'Storage');
/*!40000 ALTER TABLE `equipment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gym_branch`
--

DROP TABLE IF EXISTS `gym_branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gym_branch` (
  `branchId` int NOT NULL AUTO_INCREMENT,
  `bName` varchar(255) DEFAULT NULL,
  `bAddress` varchar(255) DEFAULT NULL,
  `timeSlotCapacity` int unsigned DEFAULT NULL,
  PRIMARY KEY (`branchId`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gym_branch`
--

LOCK TABLES `gym_branch` WRITE;
/*!40000 ALTER TABLE `gym_branch` DISABLE KEYS */;
INSERT INTO `gym_branch` VALUES (1,'Banff Trail','2123 33 Ave SW, Calgary, AB T2T 1Z7',45),(2,'Westhills','2000 69 St SW',35),(3,'Crowfoot','150 Crowfoot Crescent NW Unit 323, Calgary, AB T3G 3T2',40),(4,'Downtown','140 8 Ave SW, Calgary, AB T2P 1B3',30);
/*!40000 ALTER TABLE `gym_branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gym_storage`
--

DROP TABLE IF EXISTS `gym_storage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gym_storage` (
  `branchId` int NOT NULL,
  `storageType` varchar(255) NOT NULL,
  PRIMARY KEY (`branchId`,`storageType`),
  CONSTRAINT `gym_storage_ibfk_1` FOREIGN KEY (`branchId`) REFERENCES `gym_branch` (`branchId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gym_storage`
--

LOCK TABLES `gym_storage` WRITE;
/*!40000 ALTER TABLE `gym_storage` DISABLE KEYS */;
INSERT INTO `gym_storage` VALUES (1,'Floor'),(1,'Storage'),(2,'Floor'),(2,'Storage'),(3,'Floor'),(3,'Storage'),(4,'Floor'),(4,'Storage');
/*!40000 ALTER TABLE `gym_storage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instructs`
--

DROP TABLE IF EXISTS `instructs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instructs` (
  `serviceId` int NOT NULL,
  `eId` int NOT NULL,
  `branchId` int NOT NULL,
  PRIMARY KEY (`serviceId`,`eId`,`branchId`),
  KEY `serviceId` (`serviceId`,`branchId`),
  KEY `eId` (`eId`),
  CONSTRAINT `instructs_ibfk_1` FOREIGN KEY (`serviceId`, `branchId`) REFERENCES `service` (`serviceId`, `branchId`),
  CONSTRAINT `instructs_ibfk_2` FOREIGN KEY (`eId`) REFERENCES `employee` (`eId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instructs`
--

LOCK TABLES `instructs` WRITE;
/*!40000 ALTER TABLE `instructs` DISABLE KEYS */;
/*!40000 ALTER TABLE `instructs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manages`
--

DROP TABLE IF EXISTS `manages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manages` (
  `branchId` int NOT NULL,
  `eId` int NOT NULL,
  PRIMARY KEY (`branchId`,`eId`),
  KEY `eId` (`eId`),
  CONSTRAINT `manages_ibfk_1` FOREIGN KEY (`branchId`) REFERENCES `gym_branch` (`branchId`),
  CONSTRAINT `manages_ibfk_2` FOREIGN KEY (`eId`) REFERENCES `employee` (`eId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manages`
--

LOCK TABLES `manages` WRITE;
/*!40000 ALTER TABLE `manages` DISABLE KEYS */;
INSERT INTO `manages` VALUES (2,10021),(3,10022),(1,10024),(4,10027);
/*!40000 ALTER TABLE `manages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reports` (
  `eId` int NOT NULL,
  `clientId` int NOT NULL,
  `issue` varchar(1024) DEFAULT NULL,
  `dateOfReport` date DEFAULT NULL,
  `curStatus` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`eId`,`clientId`),
  KEY `clientId` (`clientId`),
  CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`eId`) REFERENCES `equipment` (`eId`),
  CONSTRAINT `reports_ibfk_2` FOREIGN KEY (`clientId`) REFERENCES `client` (`clientId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reports`
--

LOCK TABLES `reports` WRITE;
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;
/*!40000 ALTER TABLE `reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service`
--

DROP TABLE IF EXISTS `service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service` (
  `serviceId` int NOT NULL AUTO_INCREMENT,
  `branchId` int NOT NULL,
  `serviceName` varchar(255) DEFAULT NULL,
  `timeOfService` time DEFAULT NULL,
  `daysOfService` varchar(255) DEFAULT NULL,
  `capacity` int DEFAULT NULL,
  `description` text,
  `timeEnds` time DEFAULT NULL,
  PRIMARY KEY (`serviceId`,`branchId`),
  KEY `branchId` (`branchId`),
  CONSTRAINT `service_ibfk_1` FOREIGN KEY (`branchId`) REFERENCES `gym_branch` (`branchId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service`
--

LOCK TABLES `service` WRITE;
/*!40000 ALTER TABLE `service` DISABLE KEYS */;
INSERT INTO `service` VALUES (1,1,'Orientation','04:00:00','MWF',20,'A quick primer on how to use our equipment safely.','04:15:00'),(2,2,'Orientation','05:00:00','MWF',10,'A quick primer on how to use our equipment safely.','05:15:00'),(3,3,'Orientation','02:00:00','MWF',20,'A quick primer on how to use our equipment safely.','02:15:00'),(4,4,'Orientation','01:00:00','MWF',25,'A quick primer on how to use our equipment safely.','01:15:00'),(5,1,'Zeyad\'s Ultimate Deadlifting Guide','02:00:00','TR',15,'Zeyad shows the path to mastering the deadlift.','03:00:00'),(6,2,'Austin\'s Benchpress Masterclass','02:30:00','RF',10,'How to double your bench weight!?','03:30:00'),(7,3,'35 Ways to Stretch','04:30:00','WRF',20,'This is how you can spice up the ends of your workouts.','05:30:00'),(8,4,'Intro to Ice Skating Forms','03:25:00','SU',10,'A beginner\'s class on mastering the ice.','04:30:00');
/*!40000 ALTER TABLE `service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_books`
--

DROP TABLE IF EXISTS `service_books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_books` (
  `branchId` int NOT NULL,
  `serviceId` int NOT NULL,
  `clientId` int NOT NULL,
  `dateOfBooking` date NOT NULL,
  PRIMARY KEY (`branchId`,`serviceId`,`clientId`,`dateOfBooking`),
  KEY `serviceId` (`serviceId`),
  KEY `clientId` (`clientId`),
  CONSTRAINT `service_books_ibfk_1` FOREIGN KEY (`branchId`) REFERENCES `gym_branch` (`branchId`),
  CONSTRAINT `service_books_ibfk_2` FOREIGN KEY (`serviceId`) REFERENCES `service` (`serviceId`),
  CONSTRAINT `service_books_ibfk_3` FOREIGN KEY (`clientId`) REFERENCES `client` (`clientId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_books`
--

LOCK TABLES `service_books` WRITE;
/*!40000 ALTER TABLE `service_books` DISABLE KEYS */;
INSERT INTO `service_books` VALUES (3,3,1,'2022-04-11'),(3,3,1,'2022-04-13'),(3,7,1,'2022-04-14');
/*!40000 ALTER TABLE `service_books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `time_books`
--

DROP TABLE IF EXISTS `time_books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `time_books` (
  `clientId` int NOT NULL,
  `branchId` int NOT NULL,
  `dateOfBooking` date NOT NULL,
  `timeOfBooking` time NOT NULL,
  PRIMARY KEY (`clientId`,`branchId`,`dateOfBooking`,`timeOfBooking`),
  KEY `branchId` (`branchId`,`dateOfBooking`,`timeOfBooking`),
  CONSTRAINT `time_books_ibfk_1` FOREIGN KEY (`clientId`) REFERENCES `client` (`clientId`),
  CONSTRAINT `time_books_ibfk_2` FOREIGN KEY (`branchId`, `dateOfBooking`, `timeOfBooking`) REFERENCES `time_slot` (`branchId`, `dateOfBooking`, `timeOfBooking`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `time_books`
--

LOCK TABLES `time_books` WRITE;
/*!40000 ALTER TABLE `time_books` DISABLE KEYS */;
/*!40000 ALTER TABLE `time_books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `time_slot`
--

DROP TABLE IF EXISTS `time_slot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `time_slot` (
  `branchId` int NOT NULL,
  `dateOfBooking` date NOT NULL,
  `timeOfBooking` time NOT NULL,
  PRIMARY KEY (`branchId`,`dateOfBooking`,`timeOfBooking`),
  CONSTRAINT `time_slot_ibfk_1` FOREIGN KEY (`branchId`, `dateOfBooking`) REFERENCES `day_schedule` (`branchId`, `dateOfBooking`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `time_slot`
--

LOCK TABLES `time_slot` WRITE;
/*!40000 ALTER TABLE `time_slot` DISABLE KEYS */;
INSERT INTO `time_slot` VALUES (1,'2022-04-11','06:00:00'),(1,'2022-04-11','07:00:00'),(1,'2022-04-11','08:00:00'),(1,'2022-04-11','09:00:00'),(1,'2022-04-11','10:00:00'),(1,'2022-04-11','11:00:00'),(1,'2022-04-11','12:00:00'),(1,'2022-04-11','13:00:00'),(1,'2022-04-11','14:00:00'),(1,'2022-04-11','15:00:00'),(1,'2022-04-11','16:00:00'),(1,'2022-04-11','17:00:00'),(1,'2022-04-11','18:00:00'),(1,'2022-04-11','19:00:00'),(1,'2022-04-11','20:00:00'),(1,'2022-04-11','21:00:00'),(1,'2022-04-11','22:00:00'),(1,'2022-04-12','06:00:00'),(1,'2022-04-12','07:00:00'),(1,'2022-04-12','08:00:00'),(1,'2022-04-12','09:00:00'),(1,'2022-04-12','10:00:00'),(1,'2022-04-12','11:00:00'),(1,'2022-04-12','12:00:00'),(1,'2022-04-12','13:00:00'),(1,'2022-04-12','14:00:00'),(1,'2022-04-12','15:00:00'),(1,'2022-04-12','16:00:00'),(1,'2022-04-12','17:00:00'),(1,'2022-04-12','18:00:00'),(1,'2022-04-12','19:00:00'),(1,'2022-04-12','20:00:00'),(1,'2022-04-12','21:00:00'),(1,'2022-04-12','22:00:00'),(1,'2022-04-13','06:00:00'),(1,'2022-04-13','07:00:00'),(1,'2022-04-13','08:00:00'),(1,'2022-04-13','09:00:00'),(1,'2022-04-13','10:00:00'),(1,'2022-04-13','11:00:00'),(1,'2022-04-13','12:00:00'),(1,'2022-04-13','13:00:00'),(1,'2022-04-13','14:00:00'),(1,'2022-04-13','15:00:00'),(1,'2022-04-13','16:00:00'),(1,'2022-04-13','17:00:00'),(1,'2022-04-13','18:00:00'),(1,'2022-04-13','19:00:00'),(1,'2022-04-13','20:00:00'),(1,'2022-04-13','21:00:00'),(1,'2022-04-13','22:00:00'),(1,'2022-04-14','06:00:00'),(1,'2022-04-14','07:00:00'),(1,'2022-04-14','08:00:00'),(1,'2022-04-14','09:00:00'),(1,'2022-04-14','10:00:00'),(1,'2022-04-14','11:00:00'),(1,'2022-04-14','12:00:00'),(1,'2022-04-14','13:00:00'),(1,'2022-04-14','14:00:00'),(1,'2022-04-14','15:00:00'),(1,'2022-04-14','16:00:00'),(1,'2022-04-14','17:00:00'),(1,'2022-04-14','18:00:00'),(1,'2022-04-14','19:00:00'),(1,'2022-04-14','20:00:00'),(1,'2022-04-14','21:00:00'),(1,'2022-04-14','22:00:00'),(1,'2022-04-15','06:00:00'),(1,'2022-04-15','07:00:00'),(1,'2022-04-15','08:00:00'),(1,'2022-04-15','09:00:00'),(1,'2022-04-15','10:00:00'),(1,'2022-04-15','11:00:00'),(1,'2022-04-15','12:00:00'),(1,'2022-04-15','13:00:00'),(1,'2022-04-15','14:00:00'),(1,'2022-04-15','15:00:00'),(1,'2022-04-15','16:00:00'),(1,'2022-04-15','17:00:00'),(1,'2022-04-15','18:00:00'),(1,'2022-04-15','19:00:00'),(1,'2022-04-15','20:00:00'),(1,'2022-04-15','21:00:00'),(1,'2022-04-15','22:00:00'),(1,'2022-04-16','06:00:00'),(1,'2022-04-16','07:00:00'),(1,'2022-04-16','08:00:00'),(1,'2022-04-16','09:00:00'),(1,'2022-04-16','10:00:00'),(1,'2022-04-16','11:00:00'),(1,'2022-04-16','12:00:00'),(1,'2022-04-16','13:00:00'),(1,'2022-04-16','14:00:00'),(1,'2022-04-16','15:00:00'),(1,'2022-04-16','16:00:00'),(1,'2022-04-16','17:00:00'),(1,'2022-04-16','18:00:00'),(1,'2022-04-16','19:00:00'),(1,'2022-04-16','20:00:00'),(1,'2022-04-16','21:00:00'),(1,'2022-04-16','22:00:00'),(1,'2022-04-17','06:00:00'),(1,'2022-04-17','07:00:00'),(1,'2022-04-17','08:00:00'),(1,'2022-04-17','09:00:00'),(1,'2022-04-17','10:00:00'),(1,'2022-04-17','11:00:00'),(1,'2022-04-17','12:00:00'),(1,'2022-04-17','13:00:00'),(1,'2022-04-17','14:00:00'),(1,'2022-04-17','15:00:00'),(1,'2022-04-17','16:00:00'),(1,'2022-04-17','17:00:00'),(1,'2022-04-17','18:00:00'),(1,'2022-04-17','19:00:00'),(1,'2022-04-17','20:00:00'),(1,'2022-04-17','21:00:00'),(1,'2022-04-17','22:00:00');
/*!40000 ALTER TABLE `time_slot` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-11 19:53:03
