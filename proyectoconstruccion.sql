-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: proyectoconstruccion
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `administrator`
--

DROP TABLE IF EXISTS `administrator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrator` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrator`
--

LOCK TABLES `administrator` WRITE;
/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
INSERT INTO `administrator` VALUES (1,'Mariano','12345'),(3,'Johan','123'),(4,'jefe_logistica','12345');
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cell`
--

DROP TABLE IF EXISTS `cell`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cell` (
  `cell_number` int NOT NULL AUTO_INCREMENT,
  `height` float DEFAULT NULL,
  `length` float DEFAULT NULL,
  `width` float DEFAULT NULL,
  `occupied_space` float NOT NULL,
  `storage_key_id` int DEFAULT NULL,
  PRIMARY KEY (`cell_number`),
  KEY `FKnk3jl6u6d7s3do4rb6rcnv9bs` (`storage_key_id`),
  CONSTRAINT `FKnk3jl6u6d7s3do4rb6rcnv9bs` FOREIGN KEY (`storage_key_id`) REFERENCES `storage_keys` (`storage_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cell`
--

LOCK TABLES `cell` WRITE;
/*!40000 ALTER TABLE `cell` DISABLE KEYS */;
/*!40000 ALTER TABLE `cell` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `delivery_truck`
--

DROP TABLE IF EXISTS `delivery_truck`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `delivery_truck` (
  `tracking_number` varchar(255) NOT NULL,
  `capacity` double NOT NULL,
  `mileage` double NOT NULL,
  PRIMARY KEY (`tracking_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delivery_truck`
--

LOCK TABLES `delivery_truck` WRITE;
/*!40000 ALTER TABLE `delivery_truck` DISABLE KEYS */;
/*!40000 ALTER TABLE `delivery_truck` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `furniture`
--

DROP TABLE IF EXISTS `furniture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `furniture` (
  `furniture_id` int NOT NULL AUTO_INCREMENT,
  `brand` varchar(255) DEFAULT NULL,
  `build_time` int NOT NULL,
  `color` varchar(255) DEFAULT NULL,
  `height` float DEFAULT NULL,
  `length` float DEFAULT NULL,
  `width` float DEFAULT NULL,
  `quantity` int NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `order_id` int DEFAULT NULL,
  PRIMARY KEY (`furniture_id`),
  KEY `FKegyksbcs05q6jw876dkg4c4bq` (`order_id`),
  CONSTRAINT `FKegyksbcs05q6jw876dkg4c4bq` FOREIGN KEY (`order_id`) REFERENCES `orders` (`orderid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `furniture`
--

LOCK TABLES `furniture` WRITE;
/*!40000 ALTER TABLE `furniture` DISABLE KEYS */;
/*!40000 ALTER TABLE `furniture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_truck_assignment`
--

DROP TABLE IF EXISTS `order_truck_assignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_truck_assignment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `truck_id` varchar(255) DEFAULT NULL,
  `route_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK2lt9gtu1s79m4yhihgjc566cd` (`truck_id`),
  KEY `FKdvxvc7cs0g38fckmmybgbrfxx` (`route_id`),
  CONSTRAINT `FK2lt9gtu1s79m4yhihgjc566cd` FOREIGN KEY (`truck_id`) REFERENCES `delivery_truck` (`tracking_number`),
  CONSTRAINT `FKdvxvc7cs0g38fckmmybgbrfxx` FOREIGN KEY (`route_id`) REFERENCES `route` (`route_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_truck_assignment`
--

LOCK TABLES `order_truck_assignment` WRITE;
/*!40000 ALTER TABLE `order_truck_assignment` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_truck_assignment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `orderid` int NOT NULL AUTO_INCREMENT,
  `delivery_date` date DEFAULT NULL,
  `destination` varchar(255) DEFAULT NULL,
  `total_assembly_time` decimal(21,0) DEFAULT NULL,
  `route_id` int DEFAULT NULL,
  PRIMARY KEY (`orderid`),
  KEY `FKeop7en0d481ppxbnglcmxd5u9` (`route_id`),
  CONSTRAINT `FKeop7en0d481ppxbnglcmxd5u9` FOREIGN KEY (`route_id`) REFERENCES `route` (`route_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `packing_list`
--

DROP TABLE IF EXISTS `packing_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `packing_list` (
  `folio` int NOT NULL,
  `arrival_date` date DEFAULT NULL,
  PRIMARY KEY (`folio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `packing_list`
--

LOCK TABLES `packing_list` WRITE;
/*!40000 ALTER TABLE `packing_list` DISABLE KEYS */;
/*!40000 ALTER TABLE `packing_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `packing_list_products`
--

DROP TABLE IF EXISTS `packing_list_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `packing_list_products` (
  `packing_list_folio` int NOT NULL,
  `products_furniture_id` int NOT NULL,
  UNIQUE KEY `UK95rk9kja53t5v2fx5nifbu5w0` (`products_furniture_id`),
  KEY `FK2vdcc214aqiiy7cyevun9w44j` (`packing_list_folio`),
  CONSTRAINT `FK2vdcc214aqiiy7cyevun9w44j` FOREIGN KEY (`packing_list_folio`) REFERENCES `packing_list` (`folio`),
  CONSTRAINT `FKnlty69rnrdc6lhur2lqx73lij` FOREIGN KEY (`products_furniture_id`) REFERENCES `furniture` (`furniture_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `packing_list_products`
--

LOCK TABLES `packing_list_products` WRITE;
/*!40000 ALTER TABLE `packing_list_products` DISABLE KEYS */;
/*!40000 ALTER TABLE `packing_list_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `platform`
--

DROP TABLE IF EXISTS `platform`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `platform` (
  `platform_id` int NOT NULL AUTO_INCREMENT,
  `height` float DEFAULT NULL,
  `length` float DEFAULT NULL,
  `width` float DEFAULT NULL,
  `storage_key_id` int NOT NULL,
  `order_id` int NOT NULL,
  PRIMARY KEY (`platform_id`),
  UNIQUE KEY `UKsnmoy7y0nren17way3vetebm8` (`storage_key_id`),
  KEY `FKsl290hd507jwa51d591jdt42m` (`order_id`),
  CONSTRAINT `FKdhaq4ojvkevbir7ncp01y6fk1` FOREIGN KEY (`storage_key_id`) REFERENCES `storage_keys` (`storage_id`),
  CONSTRAINT `FKsl290hd507jwa51d591jdt42m` FOREIGN KEY (`order_id`) REFERENCES `orders` (`orderid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `platform`
--

LOCK TABLES `platform` WRITE;
/*!40000 ALTER TABLE `platform` DISABLE KEYS */;
/*!40000 ALTER TABLE `platform` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rack`
--

DROP TABLE IF EXISTS `rack`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rack` (
  `rack_number` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`rack_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rack`
--

LOCK TABLES `rack` WRITE;
/*!40000 ALTER TABLE `rack` DISABLE KEYS */;
/*!40000 ALTER TABLE `rack` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `route`
--

DROP TABLE IF EXISTS `route`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `route` (
  `route_id` int NOT NULL AUTO_INCREMENT,
  `distance` float NOT NULL,
  `estimated_time` time(6) DEFAULT NULL,
  `origin_location` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`route_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `route`
--

LOCK TABLES `route` WRITE;
/*!40000 ALTER TABLE `route` DISABLE KEYS */;
/*!40000 ALTER TABLE `route` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `route_destinations`
--

DROP TABLE IF EXISTS `route_destinations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `route_destinations` (
  `route_route_id` int NOT NULL,
  `destinations` varchar(255) DEFAULT NULL,
  KEY `FKi5btm6mnh3tjqww1nvai7liyv` (`route_route_id`),
  CONSTRAINT `FKi5btm6mnh3tjqww1nvai7liyv` FOREIGN KEY (`route_route_id`) REFERENCES `route` (`route_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `route_destinations`
--

LOCK TABLES `route_destinations` WRITE;
/*!40000 ALTER TABLE `route_destinations` DISABLE KEYS */;
/*!40000 ALTER TABLE `route_destinations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `route_travel_times`
--

DROP TABLE IF EXISTS `route_travel_times`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `route_travel_times` (
  `route_route_id` int NOT NULL,
  `travel_times` decimal(21,0) DEFAULT NULL,
  KEY `FK7cetptwc2vl04jy91fohsmt9y` (`route_route_id`),
  CONSTRAINT `FK7cetptwc2vl04jy91fohsmt9y` FOREIGN KEY (`route_route_id`) REFERENCES `route` (`route_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `route_travel_times`
--

LOCK TABLES `route_travel_times` WRITE;
/*!40000 ALTER TABLE `route_travel_times` DISABLE KEYS */;
/*!40000 ALTER TABLE `route_travel_times` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `route_truck_assignment`
--

DROP TABLE IF EXISTS `route_truck_assignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `route_truck_assignment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `truck_id` varchar(255) DEFAULT NULL,
  `route_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK2cfi7ueppc396y4rvdylkx8ms` (`truck_id`),
  KEY `FKqoul0r6imudwh1qn82kbdd4py` (`route_id`),
  CONSTRAINT `FK2cfi7ueppc396y4rvdylkx8ms` FOREIGN KEY (`truck_id`) REFERENCES `delivery_truck` (`tracking_number`),
  CONSTRAINT `FKqoul0r6imudwh1qn82kbdd4py` FOREIGN KEY (`route_id`) REFERENCES `route` (`route_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `route_truck_assignment`
--

LOCK TABLES `route_truck_assignment` WRITE;
/*!40000 ALTER TABLE `route_truck_assignment` DISABLE KEYS */;
/*!40000 ALTER TABLE `route_truck_assignment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storage_keys`
--

DROP TABLE IF EXISTS `storage_keys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `storage_keys` (
  `storage_id` int NOT NULL AUTO_INCREMENT,
  `cell_id` int NOT NULL,
  `platform_id` int NOT NULL,
  `rack_id` int NOT NULL,
  PRIMARY KEY (`storage_id`),
  KEY `FKps4whcrs0eykgjj0mwvr7v9en` (`cell_id`),
  KEY `FK28e4s8g9qk27578ubqs8f8r0p` (`platform_id`),
  KEY `FKhh7j6cu850t3kd2io9x74m3rf` (`rack_id`),
  CONSTRAINT `FK28e4s8g9qk27578ubqs8f8r0p` FOREIGN KEY (`platform_id`) REFERENCES `platform` (`platform_id`),
  CONSTRAINT `FKhh7j6cu850t3kd2io9x74m3rf` FOREIGN KEY (`rack_id`) REFERENCES `rack` (`rack_number`),
  CONSTRAINT `FKps4whcrs0eykgjj0mwvr7v9en` FOREIGN KEY (`cell_id`) REFERENCES `cell` (`cell_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storage_keys`
--

LOCK TABLES `storage_keys` WRITE;
/*!40000 ALTER TABLE `storage_keys` DISABLE KEYS */;
/*!40000 ALTER TABLE `storage_keys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `truck_assignment`
--

DROP TABLE IF EXISTS `truck_assignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `truck_assignment` (
  `assignment_id` int NOT NULL AUTO_INCREMENT,
  `tracking_number` varchar(255) DEFAULT NULL,
  `driver_id` int DEFAULT NULL,
  PRIMARY KEY (`assignment_id`),
  KEY `FK3rbe7bbw2n6dwtreruubkfmj4` (`tracking_number`),
  KEY `FKe2b0df9y2qt5mim1r46wwsx38` (`driver_id`),
  CONSTRAINT `FK3rbe7bbw2n6dwtreruubkfmj4` FOREIGN KEY (`tracking_number`) REFERENCES `delivery_truck` (`tracking_number`),
  CONSTRAINT `FKe2b0df9y2qt5mim1r46wwsx38` FOREIGN KEY (`driver_id`) REFERENCES `truck_driver` (`license_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `truck_assignment`
--

LOCK TABLES `truck_assignment` WRITE;
/*!40000 ALTER TABLE `truck_assignment` DISABLE KEYS */;
/*!40000 ALTER TABLE `truck_assignment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `truck_driver`
--

DROP TABLE IF EXISTS `truck_driver`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `truck_driver` (
  `license_number` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`license_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `truck_driver`
--

LOCK TABLES `truck_driver` WRITE;
/*!40000 ALTER TABLE `truck_driver` DISABLE KEYS */;
/*!40000 ALTER TABLE `truck_driver` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-03 18:42:26
