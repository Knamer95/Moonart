CREATE DATABASE  IF NOT EXISTS `moonart` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `moonart`;
-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: localhost    Database: moonart
-- ------------------------------------------------------
-- Server version	5.7.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `config`
--

DROP TABLE IF EXISTS `config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `night_mode` tinyint(1) DEFAULT '0',
  `scroll` tinyint(1) DEFAULT '1',
  `nsfw` tinyint(1) DEFAULT '0',
  `epilepsy` tinyint(1) DEFAULT '0',
  `lang` tinyint(16) DEFAULT '1' COMMENT '1 => en. 2 => es',
  `color` varchar(12) DEFAULT 'blue',
  `share` tinyint(1) DEFAULT '1',
  `feed` smallint(6) DEFAULT '15',
  PRIMARY KEY (`id`),
  KEY `fk_user_config` (`user_id`),
  CONSTRAINT `fk_user_config` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `config`
--

LOCK TABLES `config` WRITE;
/*!40000 ALTER TABLE `config` DISABLE KEYS */;
INSERT INTO `config` VALUES (4,2,0,1,1,1,2,'blue',1,5),(5,1,1,1,1,1,1,'orange',1,5),(8,4,1,1,1,1,1,'orange',1,5),(9,3,0,1,1,1,1,'orange',1,15);
/*!40000 ALTER TABLE `config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image_comments`
--

DROP TABLE IF EXISTS `image_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `image_comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `image_id` int(11) NOT NULL,
  `comment` varchar(300) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `status` enum('deleted','hidden','published') DEFAULT 'published',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_image_comments_image` (`image_id`),
  KEY `fk_image_comments_user` (`user_id`),
  CONSTRAINT `fk_image_comments_image` FOREIGN KEY (`image_id`) REFERENCES `images` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_image_comments_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=145 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image_comments`
--

LOCK TABLES `image_comments` WRITE;
/*!40000 ALTER TABLE `image_comments` DISABLE KEYS */;
INSERT INTO `image_comments` VALUES (142,4,95,'\"Omg I love it! Thank you for tagging me :)\\\\n\\\\nI casually saw it, because this web doesn\'t notify when someone you follow uploads a pic... or at least yet. We will implement it! \\ud83d\\ude0a\"',0,'published','2021-02-06 07:06:10'),(143,1,95,'\"@Moon Haha I\'m so glad you liked it! \\\\n\\\\nAnd oh I\'d love that feature. Looking forward to it!\"',142,'published','2021-02-06 07:07:04'),(144,1,102,'\"Oh that\'s so pretty!\\\\n\\\\nI was thinking... how about being able to like comments? Would that be a nice idea?\\\\n\\\\nMaybe I\'m adding too much stuff... sorry myself!\"',0,'published','2021-02-06 07:29:42');
/*!40000 ALTER TABLE `image_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `url` varchar(30) NOT NULL,
  `name` varchar(60) NOT NULL,
  `description` varchar(600) DEFAULT NULL,
  `status` varchar(12) DEFAULT 'published',
  `nsfw` tinyint(1) DEFAULT '0',
  `epilepsy` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `rights` varchar(10) DEFAULT 'total',
  `tags` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_image_user` (`user_id`),
  CONSTRAINT `fk_image_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (95,1,'FWIQJLEXRH-531711.jpeg','Materials to make art!','Picture of some materials to make art. I love the colors, everything is so blue... It looks so relaxing for some reason...\\n\\nDedicated to @Moon who wanted to buy some ^^\\n\\nThis picture has free license, and doesn\'t need to be credited. Found at https://pixabay.com/','published',0,0,'2021-02-06 07:03:15','2021-02-06 07:03:15','totales','materials, blue, art, clips, pencil, pen, glue, ruler, buttons, crayon, rubber, everything'),(96,4,'KVQDYUESGY-722382.png','My first drawing','Hello there! \\n\\nThis is my first drawing on this webpage. Her name is Zoe, from League of Legends.\\n\\nI chose some casual clothes for her, something that would look kind of summer-ish. I also drew her yo-yo, although her hand looks kinda bad haha.\\n\\nPlease don\'t use for commercial purposes.','published',0,1,'2021-02-06 07:10:00','2021-02-06 07:10:00','totales','zoe, casual, league, of, legends, league of legends, yo-yo, high, socks'),(97,1,'DEPXEPOXBY-636556.jpeg','Autumn','Autumn is over, and now we are in winter... or at least in Europe!\\n\\nPicture of some beautiful leafs, found on the internet. Altho this website is supposed to be for personal art sharing, I have to fill it with some pictures so you can see how it looks like.','published',0,0,'2021-02-06 07:11:46','2021-02-06 07:11:46','totales','autumn, leaves, beautiful'),(98,1,'ELUYJLSCEO-146370.jpeg','White dress','Lady on a white dress.\\n\\nThat pic is so white! The sea looks beautiful too. Everything looks beautiful.','published',0,0,'2021-02-06 07:13:17','2021-02-06 07:13:17','totales','lady, white, dress, sea, beach'),(99,1,'IMWSRFYVTD-281825.jpeg','Windmills','Some windmills, following my previous picture\'s thematic of seas.\\n\\nNow this one looks really blue, I like the contrast of blue and white. Those are my favourite colors, besides pink.','published',0,0,'2021-02-06 07:15:03','2021-02-06 07:15:03','totales','windmills, sea, ocean, blue, white, pretty, beautiful'),(100,2,'JBIIKWWLRN-506561.jpeg','Cloudy landscape',NULL,'published',0,0,'2021-02-06 07:16:43','2021-02-06 07:16:43','totales',NULL),(101,2,'VTQCOOXWSD-886388.jpeg','Halloween moon','Drawing (probably) of a full bright moon, with some trees and bats on the front.\\n\\nI guess you could say this is... moonart.','published',0,0,'2021-02-06 07:18:51','2021-02-06 07:18:51','totales','moon, bright, full, bats, beautiful, trees'),(102,4,'INAINJSYKM-068470.jpeg','Colourful Zoe','Here I am with yet another drawing of Zoe!\\n\\nThis time, as you probably have noticed, this is not mine. It\'s drawn by bonniie_art (instagram). It\'s a commision.','published',0,0,'2021-02-06 07:22:47','2021-02-06 07:22:47','totales','zoe, bonniie, art, bonniie_art, beautiful, colourful, league, of, legends, league of legends'),(103,1,'BUMBBJIWEH-424810.jpeg','Picture of a drawing','Picture of a drawing... or at least it looks like a picture!\\n\\nOtherwise it\'d be drawing-ception, wouldn\'t it?','published',0,0,'2021-02-06 07:26:09','2021-02-06 07:26:09','totales','drawing, pen, notebook, wood'),(104,1,'EENRWBVVYK-844864.jpeg','Sunset','Picture of a beautiful sunset. I feel like every landscape I see is beatiful... haha.','published',0,0,'2021-02-06 07:27:38','2021-02-06 07:27:38','totales','landscape, sunset'),(105,2,'FNLWXKAXOY-052413.jpeg','Chameleon','I\'m green daba dee daba die..\\n\\nThey look interested at what they are staring... I wonder what is it? Maybe some insects. Yummy.\\n\\nMarked as explicit in case someone dislikes chameleons. How could they though!','published',1,0,'2021-02-06 07:32:29','2021-02-06 07:32:29','totales','chameleon, green'),(106,2,'ICKHOAAEKT-588248.jpeg','Dark night','Another halloween themed picture. Although I don\'t really like halloween that much. \\n\\nBut I like bright moons.','published',0,0,'2021-02-06 07:35:36','2021-02-06 07:35:36','totales',NULL),(107,1,'FRMHOIUNGE-804037.jpeg','Mountains','I\'m not sure if me or someone else (me with other accounts since I\'m the only one using this...) uploaded it. But in that case, reupload!','published',0,0,'2021-02-06 07:37:51','2021-02-06 07:37:51','totales','mountains, picture, beautiful'),(108,4,'UJFAJHMJVM-214217.jpeg','Alina Gray','Alina Gray commision. From the anime Magia Record, a side story of Madoka Magica (a masterpiece). Not everything is about Zoe on my profile.\\n\\nMade by aleriy_ (instagram)','published',0,0,'2021-02-06 07:43:38','2021-02-06 07:43:38','ninguno','aleriy_, alina, gray, magia, record, commision'),(109,1,'FIPVOMFRFE-015751.png','Snowy day','Drawing of a snowy day. It looks colourful, but at the same time kinda sad, doesn\'t it?\\n\\nProbably because even though it\'s luminous, it\'s very white, and the tree has no leaves.','published',0,0,'2021-02-06 07:46:38','2021-02-06 07:46:38','totales','leaves, tree, snow, sad'),(110,1,'UDCCSYYQVW-431438.jpeg','Kitty','I love cats!\\n\\nI don\'t know what else to say... I wish I could have a kitten, but they need some care, and it\'s not that easy. I will definetly adopt one in the future though. ','published',0,0,'2021-02-06 07:55:14','2021-02-06 07:55:14','totales','cat, kitty, stare, curious, beautiful'),(111,1,'XJYNVTJSOH-073600.jpeg','Photoception','Photo of a camera doing a photo.','published',0,0,'2021-02-06 07:56:01','2021-02-06 07:56:01','totales',NULL),(112,2,'UWGOIWDCCT-345618.png','Snowy day','I think @Nao uploaded another snowy picture, with this title hehe.\\n\\nI love snow, but it\'s so cold... I always forget my gloves :(','published',0,0,'2021-02-06 08:04:10','2021-02-06 08:04:10','totales','snow, snowy, day, white'),(113,2,'CPAOXVNMHW-723482.jpeg','Morning walk','Picture of some people doing a morning walk I guess...\\n\\nThe sun looks like it just set.','published',0,0,'2021-02-06 08:08:01','2021-02-06 08:08:01','totales',NULL),(114,2,'JDVPBQRRNA-563282.jpeg','Twilight','Twilight is a cute word.\\n\\nOr maybe dusk would fit better? I don\'t know.','published',0,0,'2021-02-06 08:10:08','2021-02-06 08:10:08','totales','twilight, picture, beautiful');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_comments`
--

DROP TABLE IF EXISTS `user_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `comment_user_id` int(11) NOT NULL,
  `comment` varchar(300) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_user_comments_user` (`user_id`),
  KEY `fk_user_comments_image` (`comment_user_id`),
  CONSTRAINT `fk_user_comments_image` FOREIGN KEY (`comment_user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_user_comments_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_comments`
--

LOCK TABLES `user_comments` WRITE;
/*!40000 ALTER TABLE `user_comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_follows_user`
--

DROP TABLE IF EXISTS `user_follows_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_follows_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `follower` int(11) NOT NULL,
  `followed` int(11) NOT NULL,
  `followed_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_user_1_id` (`follower`),
  KEY `fk_user_2_id` (`followed`),
  CONSTRAINT `fk_user_1_id` FOREIGN KEY (`follower`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_user_2_id` FOREIGN KEY (`followed`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_follows_user`
--

LOCK TABLES `user_follows_user` WRITE;
/*!40000 ALTER TABLE `user_follows_user` DISABLE KEYS */;
INSERT INTO `user_follows_user` VALUES (120,4,1,'2021-02-06 07:19:16'),(121,4,2,'2021-02-06 07:19:38'),(122,1,4,'2021-02-06 07:36:05');
/*!40000 ALTER TABLE `user_follows_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_interacts_with_image`
--

DROP TABLE IF EXISTS `user_interacts_with_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_interacts_with_image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `image_id` int(11) NOT NULL,
  `liked` tinyint(1) DEFAULT NULL,
  `faved` tinyint(1) DEFAULT NULL,
  `shared` tinyint(1) DEFAULT NULL,
  `liked_at` datetime DEFAULT NULL,
  `faved_at` datetime DEFAULT NULL,
  `shared_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_interaction_image` (`image_id`),
  KEY `fk_interaction_user` (`user_id`),
  CONSTRAINT `fk_interaction_image` FOREIGN KEY (`image_id`) REFERENCES `images` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_interaction_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=207 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_interacts_with_image`
--

LOCK TABLES `user_interacts_with_image` WRITE;
/*!40000 ALTER TABLE `user_interacts_with_image` DISABLE KEYS */;
INSERT INTO `user_interacts_with_image` VALUES (169,1,95,0,0,1,NULL,NULL,'2021-02-06 07:03:16'),(170,4,96,0,0,1,NULL,NULL,'2021-02-06 07:52:19'),(171,1,97,0,0,1,NULL,NULL,'2021-02-06 07:11:47'),(172,1,98,0,0,1,NULL,NULL,'2021-02-06 07:13:17'),(173,1,99,0,0,1,NULL,NULL,'2021-02-06 07:15:03'),(174,2,100,0,0,1,NULL,NULL,'2021-02-06 07:16:43'),(175,2,101,0,0,1,NULL,NULL,'2021-02-06 07:18:52'),(176,4,102,0,0,1,NULL,NULL,'2021-02-06 07:22:48'),(177,4,95,1,1,0,'2021-02-06 07:22:58','2021-02-06 07:22:59',NULL),(178,4,97,1,0,1,'2021-02-06 07:23:02',NULL,'2021-02-06 07:23:03'),(179,4,98,1,1,0,'2021-02-06 07:23:05','2021-02-06 07:23:08',NULL),(180,4,100,0,1,0,NULL,'2021-02-06 07:23:12',NULL),(181,4,101,1,0,1,'2021-02-06 07:23:15',NULL,'2021-02-06 07:23:15'),(182,1,103,0,0,1,NULL,NULL,'2021-02-06 07:26:09'),(183,1,104,0,0,1,NULL,NULL,'2021-02-06 07:27:39'),(184,2,105,1,0,1,'2021-02-06 07:33:54',NULL,'2021-02-06 07:32:29'),(185,2,104,1,0,0,'2021-02-06 07:33:56',NULL,NULL),(186,2,103,1,1,0,'2021-02-06 07:33:57','2021-02-06 07:33:58',NULL),(187,2,102,1,1,1,'2021-02-06 07:34:00','2021-02-06 07:34:01','2021-02-06 07:34:01'),(188,2,96,1,1,0,'2021-02-06 07:34:04','2021-02-06 07:34:05',NULL),(189,2,95,1,1,0,'2021-02-06 07:34:08','2021-02-06 07:34:09',NULL),(190,2,98,1,0,0,'2021-02-06 07:34:11',NULL,NULL),(191,2,98,0,0,1,NULL,NULL,'2021-02-06 07:34:12'),(192,2,106,0,0,1,NULL,NULL,'2021-02-06 07:35:36'),(193,1,107,0,0,1,NULL,NULL,'2021-02-06 07:37:51'),(194,4,108,0,0,1,NULL,NULL,'2021-02-06 07:43:38'),(195,1,109,0,0,1,NULL,NULL,'2021-02-06 07:46:38'),(196,1,108,1,1,1,'2021-02-06 07:47:04','2021-02-06 07:47:05','2021-02-06 07:47:06'),(197,1,102,1,1,1,'2021-02-06 07:47:16','2021-02-06 07:47:16','2021-02-06 07:47:17'),(198,1,96,1,1,1,'2021-02-06 07:47:21','2021-02-06 07:47:22','2021-02-06 07:47:22'),(199,1,100,1,0,0,'2021-02-06 07:47:28',NULL,NULL),(200,1,101,0,1,0,NULL,'2021-02-06 07:47:29',NULL),(201,1,106,0,1,0,NULL,'2021-02-06 07:47:32',NULL),(202,1,110,0,0,1,NULL,NULL,'2021-02-06 07:55:14'),(203,1,111,0,0,1,NULL,NULL,'2021-02-06 07:56:01'),(204,2,112,0,0,1,NULL,NULL,'2021-02-06 08:04:10'),(205,2,113,0,0,1,NULL,NULL,'2021-02-06 08:08:01'),(206,2,114,0,0,1,NULL,NULL,'2021-02-06 08:10:08');
/*!40000 ALTER TABLE `user_interacts_with_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL,
  `nick` varchar(16) NOT NULL,
  `password` varchar(64) NOT NULL,
  `email` varchar(50) NOT NULL,
  `description` varchar(300) DEFAULT NULL,
  `role` varchar(12) DEFAULT 'role_user',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `user_image` varchar(30) DEFAULT 'default.jpg',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Nao','Nao','6dc1b00366412461aef1ad0c10332a3f4caaae8a35950160c2a989f89dae6d0c','nao@moonart.com','Hey my name is Nao and I\'m looking for new friends and artists.\\n\\nTest.\\n\\nTest 2.\\n\\nTest 3.\\n\\nTest 4.','role_user','2019-04-30 23:36:22','GFCWNPIGHS-264185.png'),(2,'Mark','Mark','2cb330c3a0ed2740c1f74941ee6441fac705029523d9221391689a68083a94d7','mark@moonart.com','Hola, soy Marcos, y soy el creador de esta página. Espero que os guste. :)','role_mod','2019-05-03 07:48:44','FNXQUCMSRN-518768.jpeg'),(3,'Admin','admin','3b612c75a7b5048a435fb6ec81e52ff92d6d795a8b5a9c17070f6a63c97a53b2','admin@moonart.com',NULL,'role_admin','2019-05-11 22:51:42','default.jpg'),(4,'Moon','Moon','923654d39d69b2acf437e779fec5fc04357e415ec2036413dcf2d21e0691cf23','moon@moonart.com','Descripción de ejemplo','role_admin','2019-05-11 22:57:28','BMKCAXHVDU-408040.jpeg');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-06  9:31:22
