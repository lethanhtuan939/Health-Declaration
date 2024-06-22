-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: healthdeclaration
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `tbl_declaration`
--

DROP TABLE IF EXISTS `tbl_declaration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_declaration` (
  `id` int NOT NULL AUTO_INCREMENT,
  `create_by` int DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `declaration_time` datetime(6) DEFAULT NULL,
  `proof` varchar(255) DEFAULT NULL,
  `schedule` varchar(255) DEFAULT NULL,
  `symptom` varchar(255) DEFAULT NULL,
  `declarant_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKqgxwv93ikpn591g2dd60867k` (`declarant_id`),
  KEY `FK9y581xpj9g6hq1sv4qfi0c2v9` (`user_id`),
  CONSTRAINT `FK9y581xpj9g6hq1sv4qfi0c2v9` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`id`),
  CONSTRAINT `FKqgxwv93ikpn591g2dd60867k` FOREIGN KEY (`declarant_id`) REFERENCES `tbl_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_declaration`
--

LOCK TABLES `tbl_declaration` WRITE;
/*!40000 ALTER TABLE `tbl_declaration` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_declaration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_declaration_details`
--

DROP TABLE IF EXISTS `tbl_declaration_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_declaration_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `create_by` int DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `notification_id` int DEFAULT NULL,
  `pathological_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK8ppskt3nttoinb5hbkbfrh3aa` (`notification_id`),
  KEY `FKo080ida45nvrel81098ye75f` (`pathological_id`),
  CONSTRAINT `FK8ppskt3nttoinb5hbkbfrh3aa` FOREIGN KEY (`notification_id`) REFERENCES `tbl_declaration` (`id`),
  CONSTRAINT `FKo080ida45nvrel81098ye75f` FOREIGN KEY (`pathological_id`) REFERENCES `tbl_pathological` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_declaration_details`
--

LOCK TABLES `tbl_declaration_details` WRITE;
/*!40000 ALTER TABLE `tbl_declaration_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_declaration_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_notification`
--

DROP TABLE IF EXISTS `tbl_notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_notification` (
  `id` int NOT NULL AUTO_INCREMENT,
  `create_by` int DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `posting_date` datetime(6) DEFAULT NULL,
  `status` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `tbl_notification_chk_1` CHECK ((`status` between 0 and 2))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_notification`
--

LOCK TABLES `tbl_notification` WRITE;
/*!40000 ALTER TABLE `tbl_notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_notification_details`
--

DROP TABLE IF EXISTS `tbl_notification_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_notification_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `create_by` int DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `notification_id` int DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKlw4ps5ih6jixsab1ivvg4xf62` (`notification_id`),
  KEY `FKmdjbat2al4c1hb4pptinw0nxn` (`user_id`),
  CONSTRAINT `FKlw4ps5ih6jixsab1ivvg4xf62` FOREIGN KEY (`notification_id`) REFERENCES `tbl_notification` (`id`),
  CONSTRAINT `FKmdjbat2al4c1hb4pptinw0nxn` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_notification_details`
--

LOCK TABLES `tbl_notification_details` WRITE;
/*!40000 ALTER TABLE `tbl_notification_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_notification_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_pathological`
--

DROP TABLE IF EXISTS `tbl_pathological`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_pathological` (
  `id` int NOT NULL AUTO_INCREMENT,
  `create_by` int DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `description` longtext,
  `name` varchar(255) DEFAULT NULL,
  `status` enum('ENDEMIC','NORMAL','RARE','NEW_DISEASE','EPIDEMIC','PANDEMIC','ERADICATED') DEFAULT NULL,
  `type` enum('INFECTIOUS','SKIN_DISEASE','CHRONIC') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_pathological`
--

LOCK TABLES `tbl_pathological` WRITE;
/*!40000 ALTER TABLE `tbl_pathological` DISABLE KEYS */;
INSERT INTO `tbl_pathological` VALUES (1,NULL,NULL,'2024-06-15 22:16:26.244000',NULL,'Tình trạng da mãn tính.','Bệnh vảy nến','NORMAL','SKIN_DISEASE'),(2,NULL,NULL,'2024-06-15 22:51:59.713000',NULL,'Nổi ban đỏ','Sốt xuất huyết đã chỉnh sửa','NORMAL','INFECTIOUS'),(3,NULL,NULL,'2024-06-15 21:32:49.024000',NULL,'Nổi vết đốm trên tay, chân, miệng','Tay chân miệng','NORMAL','SKIN_DISEASE'),(4,NULL,NULL,'2024-06-10 09:41:37.741000',NULL,'Mệt mỏi mãn tính và yếu cơ.\nGiảm cân và chán ăn, không có khả năng tiêu hóa thức ăn.\nNám, sạm da và tàn nhang trên da (da sẫm màu đặc biệt dễ xuất hiện trên trán, đầu gối và khuỷu tay hoặc dọc theo các vết sẹo, nếp gấp da và nếp nhăn).\nHuyết áp giảm nhiều hơn khi đứng, điều này gây chóng mặt, đôi khi đến mức ngất xỉu.\nThèm muối (ăn mặn).\nLượng đường trong máu thấp, còn được gọi là hạ đường huyết.\nĐau bụng dữ dội, nôn mửa và tiêu chảy, dẫn đến mất nước.\nĐau cơ và khớp.','Bệnh Addison','RARE','CHRONIC'),(5,NULL,NULL,'2024-06-09 19:57:09.355000',NULL,'test','test','NEW_DISEASE','INFECTIOUS'),(6,NULL,NULL,'2024-06-15 22:16:55.700000',NULL,'test 2','test 2','ERADICATED','CHRONIC'),(7,NULL,NULL,'2024-06-09 20:11:20.314000',NULL,'test 3','test 3','EPIDEMIC','SKIN_DISEASE'),(8,NULL,NULL,'2024-06-06 22:13:15.860000',NULL,'test 4','test 4','ENDEMIC','SKIN_DISEASE'),(9,NULL,NULL,'2024-06-15 20:58:07.621000',NULL,'test 5','test 5','NORMAL','CHRONIC'),(10,NULL,NULL,'2024-06-15 21:33:00.737000',NULL,'test 6666666','test 6','RARE','INFECTIOUS'),(11,NULL,NULL,'2024-06-15 23:10:44.482000',NULL,'test 7','test 7','RARE','SKIN_DISEASE'),(12,NULL,NULL,'2024-06-15 23:31:39.588000',NULL,'test 8','test 8888888','ENDEMIC','INFECTIOUS');
/*!40000 ALTER TABLE `tbl_pathological` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_roles`
--

DROP TABLE IF EXISTS `tbl_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` enum('USER','MEDICAL_STAFF','ADMIN') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_roles`
--

LOCK TABLES `tbl_roles` WRITE;
/*!40000 ALTER TABLE `tbl_roles` DISABLE KEYS */;
INSERT INTO `tbl_roles` VALUES (1,'USER'),(2,'MEDICAL_STAFF'),(3,'ADMIN');
/*!40000 ALTER TABLE `tbl_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_token`
--

DROP TABLE IF EXISTS `tbl_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_token` (
  `id` int NOT NULL AUTO_INCREMENT,
  `expired` bit(1) NOT NULL,
  `revoked` bit(1) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `token_type` enum('BEARER') DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK5tf1bl1tf25n5w578v95ttn7v` (`user_id`),
  CONSTRAINT `FK5tf1bl1tf25n5w578v95ttn7v` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_token`
--

LOCK TABLES `tbl_token` WRITE;
/*!40000 ALTER TABLE `tbl_token` DISABLE KEYS */;
INSERT INTO `tbl_token` VALUES (61,_binary '\0',_binary '\0','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0aGFuaHR1YW5sZTAyMDlAZ21haWwuY29tIiwiaWF0IjoxNzE3OTM4MzQ0LCJleHAiOjE3MTgwMjQ3NDR9.0s-JsxOxUPCcGhMC0PBwE0GXKmqCFUsl-R9FrgpiiOg','BEARER',4),(67,_binary '\0',_binary '\0','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3MTg4NTE1NjMsImV4cCI6MTcxODkzNzk2M30.19I_WHOxX5-1WsTKAAjqF7HGmoyDhxq7sLwtGrKUyOw','BEARER',1);
/*!40000 ALTER TABLE `tbl_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_user`
--

DROP TABLE IF EXISTS `tbl_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `create_by` bigint DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` bigint DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `gender` enum('MALE','FEMALE','OTHER') DEFAULT NULL,
  `health_insurance_number` varchar(15) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `status` enum('ACTIVE','INACTIVE','NONE') DEFAULT NULL,
  `unique_id` varchar(255) DEFAULT NULL,
  `id_card` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_card_UNIQUE` (`id_card`),
  UNIQUE KEY `health_insurance_number_UNIQUE` (`health_insurance_number`),
  UNIQUE KEY `unique_id_UNIQUE` (`unique_id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `phone_UNIQUE` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_user`
--

LOCK TABLES `tbl_user` WRITE;
/*!40000 ALTER TABLE `tbl_user` DISABLE KEYS */;
INSERT INTO `tbl_user` VALUES (1,NULL,'2024-06-03 16:51:20.842000','2024-06-15 23:32:26.140000',NULL,'Nguyễn Văn Thoại','http://res.cloudinary.com/dxrfmq2ru/image/upload/v1718103223/zdgzplkuimlpibgorqrd.jpg','2003-10-12','admin@gmail.com','Lê Thanh Tuấn','MALE','111111111111111','$2a$10$KKO.dfPrlXDB6.VxQLl7e.epJNPthX27dBkKZnPr/fFqhNQQaOPBm','1234568900','ACTIVE','e79f12af-026f-4fda-9666-e095543996ed','049203007450'),(4,NULL,'2024-06-04 21:27:45.272000','2024-06-15 21:06:49.505000',NULL,'18 Nguyễn Văn Thoại, Ngũ Hành Sơn, Đà Nẵng','http://res.cloudinary.com/dxrfmq2ru/image/upload/v1717511439/cynesuaviygmj0vedhpe.png','2003-10-14','thanhtuanle0209@gmail.com','Đây là user','OTHER','111111111111112','$2a$10$X3Z9trYG5DDNSU30SftRtONdJ/AYaW8dlAureFZY4x63xDRXRNvfi','1234567890','ACTIVE','51ffddce-782a-4e25-a5bb-26da77630ec7','049203008743'),(5,NULL,'2024-06-09 09:12:20.147000','2024-06-09 19:54:06.615000',NULL,'address','http://res.cloudinary.com/dxrfmq2ru/image/upload/v1717916477/eojscjdywhhtxmxnxmkx.jpg','2003-10-14','medical@gmail.com','Đây là cán bộ y tế','MALE','111111111111113','$2a$10$xdxuKEqhcRKRzAsN0FJ.BO/NPDJNKfLu5lB2Q6RAp9XgyLxJPSDFy','0378315207','ACTIVE','a0f69d7f-1faf-4454-ba4e-adcdc3f7cfc7','123456654321');
/*!40000 ALTER TABLE `tbl_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role` (
  `user` bigint NOT NULL,
  `role` int NOT NULL,
  PRIMARY KEY (`user`,`role`),
  KEY `FKkljow03640acn8axhon99sncn` (`role`),
  CONSTRAINT `FKkljow03640acn8axhon99sncn` FOREIGN KEY (`role`) REFERENCES `tbl_roles` (`id`),
  CONSTRAINT `FKnlm05lvggyc66f3qc0svaghum` FOREIGN KEY (`user`) REFERENCES `tbl_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES (1,1),(4,1),(5,1),(1,2),(5,2),(1,3);
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-21 15:20:05
