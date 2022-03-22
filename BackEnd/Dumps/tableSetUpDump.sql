CREATE DATABASE  IF NOT EXISTS `olympiadb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `olympiadb`;
-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: olympiadb
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
) ENGINE=InnoDB AUTO_INCREMENT=10001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
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
  `lastname` varchar(255) DEFAULT NULL,
  `sex` char(1) DEFAULT NULL,
  `eType` varchar(255) DEFAULT NULL,
  `passwordHash` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`eId`),
  KEY `branchId` (`branchId`),
  CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`branchId`) REFERENCES `gym_branch` (`branchId`)
) ENGINE=InnoDB AUTO_INCREMENT=10001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipment`
--

LOCK TABLES `equipment` WRITE;
/*!40000 ALTER TABLE `equipment` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gym_branch`
--

LOCK TABLES `gym_branch` WRITE;
/*!40000 ALTER TABLE `gym_branch` DISABLE KEYS */;
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
/*!40000 ALTER TABLE `gym_storage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instructs`
--

DROP TABLE IF EXISTS `instructs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instructs` (
  `serviceId` int DEFAULT NULL,
  `eId` int DEFAULT NULL,
  KEY `serviceId` (`serviceId`),
  KEY `eId` (`eId`),
  CONSTRAINT `instructs_ibfk_1` FOREIGN KEY (`serviceId`) REFERENCES `service` (`serviceId`),
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
  PRIMARY KEY (`serviceId`,`branchId`),
  KEY `branchId` (`branchId`),
  CONSTRAINT `service_ibfk_1` FOREIGN KEY (`branchId`) REFERENCES `gym_branch` (`branchId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service`
--

LOCK TABLES `service` WRITE;
/*!40000 ALTER TABLE `service` DISABLE KEYS */;
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
  PRIMARY KEY (`branchId`,`serviceId`,`clientId`),
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

-- Dump completed on 2022-03-22 15:28:57
