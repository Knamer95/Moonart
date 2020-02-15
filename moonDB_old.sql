-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 08-01-2020 a las 22:59:36
-- Versión del servidor: 5.7.24
-- Versión de PHP: 7.2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `moonart`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `config`
--

DROP TABLE IF EXISTS `config`;
CREATE TABLE IF NOT EXISTS `config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `night_mode` tinyint(1) DEFAULT '0',
  `nsfw` tinyint(1) DEFAULT '0',
  `epilepsy` tinyint(1) DEFAULT '0',
  `lang` tinyint(16) DEFAULT '1' COMMENT '1 => en. 2 => es',
  `color` varchar(12) DEFAULT 'blue',
  `share` tinyint(1) DEFAULT '1',
  `feed` smallint(6) DEFAULT '15',
  PRIMARY KEY (`id`),
  KEY `fk_user_config` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `config`
--

INSERT INTO `config` (`id`, `user_id`, `night_mode`, `nsfw`, `epilepsy`, `lang`, `color`, `share`, `feed`) VALUES
(4, 5, 1, 0, 0, 2, 'blue', 1, 5),
(5, 3, 1, 0, 1, 1, 'blue', 1, 5),
(8, 7, 1, 1, 1, 1, 'blue', 1, 5),
(9, 6, 0, 1, 1, 1, 'orange', 1, 15),
(10, 8, 0, 0, 0, 1, 'blue', 1, 15),
(11, 10, 0, 0, 0, 1, 'blue', 1, 15),
(12, 12, 1, 0, 0, 1, 'blue', 1, 5),
(13, 13, 0, 0, 0, 1, 'blue', 1, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `images`
--

DROP TABLE IF EXISTS `images`;
CREATE TABLE IF NOT EXISTS `images` (
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
  KEY `fk_image_user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `images`
--

INSERT INTO `images` (`id`, `user_id`, `url`, `name`, `description`, `status`, `nsfw`, `epilepsy`, `created_at`, `updated_at`, `rights`, `tags`) VALUES
(40, 3, 'PHRTCSRERH-603711.jpeg', 'Marco and Star', NULL, 'published', 0, 0, '2019-05-04 14:40:22', '2019-05-04 14:40:22', 'totales', NULL),
(55, 5, 'RUFIHAFWJA-035470.jpeg', 'Awaken', 'From league of legends.\\nGreat clip.\\n:D', 'published', 0, 0, '2019-05-16 18:45:00', '2019-05-16 18:45:00', 'totales', 'riven, awaken, lol'),
(69, 5, 'SHUHPVWTYI-843660.png', 'Zoe lol', 'Un dibujo de Zoe poniendo cara de poco agrado.\\n\\nColoreada con Photoshop CC por @skittlebug94.\\n\\n2019\\n', 'published', 0, 0, '2019-05-17 21:24:27', '2019-05-17 21:24:27', 'ninguno', 'zoe,coffee,dislike,face,weird,lol'),
(77, 5, 'OWCMXSRJBS-620601.png', 'XD', NULL, 'published', 0, 1, '2019-05-17 23:35:11', '2019-05-17 23:35:11', 'totales', NULL),
(93, 3, 'UTPCHPNMKF-022052.jpeg', 'Zoe', 'A Zoe drawing by @bonniie_art', 'published', 0, 0, '2020-01-04 23:23:00', '2020-01-04 23:23:01', 'totales', 'zoe, art, bonniie, uwu'),
(94, 7, 'WQTKTQNFER-878828.png', 'Casual clothes Zoe', 'This is a drawing I did a while ago.\\n\\nProfile of my  accounts: @Nao, @Mark, @Moon.\\n\\n{{lt;}}script{{gt;}}console.log(\"Hello\");{{lt;}}/script{{gt;}}', 'published', 0, 0, '2020-01-08 22:32:24', '2020-01-08 22:32:24', 'totales', 'zoe, lol, oc');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `image_comments`
--

DROP TABLE IF EXISTS `image_comments`;
CREATE TABLE IF NOT EXISTS `image_comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `image_id` int(11) NOT NULL,
  `comment` varchar(300) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `status` enum('deleted','hidden','published') DEFAULT 'published',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_image_comments_image` (`image_id`),
  KEY `fk_image_comments_user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=142 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `image_comments`
--

INSERT INTO `image_comments` (`id`, `user_id`, `image_id`, `comment`, `parent_id`, `status`, `created_at`) VALUES
(2, 3, 53, 'Please desu.', NULL, 'published', '2019-05-12 16:23:08'),
(21, 3, 53, '\n', NULL, 'published', '2019-05-12 16:59:39'),
(23, 3, 53, 'Y aquí si?', NULL, 'published', '2019-05-12 17:34:01'),
(36, 5, 53, 'Pureba\\nA ver\\nSi va', NULL, 'published', '2019-05-13 01:56:13'),
(37, 5, 53, 'Chachi\\nPistachi\\nLocooo\\nPero\\nY si\\nAñado\\nMuchas?', NULL, 'published', '2019-05-13 02:06:16'),
(38, 5, 53, 'Next', NULL, 'published', '2019-05-13 02:06:56'),
(39, 5, 53, '<script></script>', NULL, 'published', '2019-05-13 02:08:30'),
(40, 5, 53, '<h1> XD </h1>', NULL, 'published', '2019-05-13 02:09:04'),
(41, 5, 43, 'XD', NULL, 'published', '2019-05-13 13:39:52'),
(42, 5, 40, 'XDDD grande tio', NULL, 'published', '2019-05-14 22:10:06'),
(50, 5, 69, 'Es muy bonito el dibujo.', NULL, 'published', '2019-05-17 22:25:58'),
(66, 3, 80, 'Mola :)', NULL, 'published', '2019-05-20 13:52:10'),
(82, 3, 77, 'Muy realista este dibujo :)', NULL, 'deleted', '2019-12-23 21:44:53'),
(84, 3, 42, 'Un ojo super bonitooooooooooooooooooooooooooooooooooooooooooooooooooooooo!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', NULL, 'published', '2019-12-23 22:15:21'),
(87, 3, 40, '@Nao :O', NULL, 'published', '2019-12-23 23:10:37'),
(88, 3, 40, '@Mark @Nao :o', NULL, 'published', '2019-12-23 23:21:32'),
(90, 3, 40, '@Mark @Nao XD @Luke haha @Moon.', NULL, 'published', '2019-12-23 23:54:40'),
(95, 3, 69, '{{lt;}}script{{gt;}}alert(\"Hello\");{{lt;}}/script{{gt;}}', NULL, 'published', '2019-12-24 19:08:01'),
(96, 3, 69, '{{lt;}}script{{gt;}}:O{{lt;}}/script{{gt;}}', NULL, 'published', '2019-12-24 19:11:38'),
(105, 3, 69, '\\ud83d\\ude0b\\ud83d\\ude0b', NULL, 'published', '2019-12-25 00:05:55'),
(108, 3, 69, '\"\\ud83d\\ude0b\"', NULL, 'published', '2019-12-25 00:25:22'),
(111, 3, 77, '\"A\\\\nB\\\\nC\\\\nD\\\\nE\"', NULL, 'published', '2019-12-25 01:54:51'),
(118, 5, 77, '\"A\\\\nB\\\\nC\\\\nD\\\\nE\\\\nF\\\\nG\\\\nH\\\\nI\\\\nJ\\\\nK\\\\nL\\\\nM\\\\nN\\\\n\\u00d1\\\\nO\\\\nP\\\\nQ\\\\nR\\\\nS\\\\nT\\\\nU\\\\nV\\\\nW\\\\nX\\\\nY\\\\nZ\\\\n0\\\\n1\\\\n2\\\\n3\\\\n4\\\\n5\\\\n6\\\\n7\\\\n8\\\\n9\"', NULL, 'published', '2019-12-25 22:03:49'),
(120, 5, 77, '\"0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789\\\\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789\\\\n012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789\"', NULL, 'published', '2019-12-25 22:05:48'),
(127, 3, 69, '\"@Mark ^^\"', 50, 'published', '2019-12-26 21:49:50'),
(133, 5, 69, '\"@Nao Test\"', 94, 'published', '2019-12-27 23:11:06'),
(134, 3, 69, '\"Padre\"', 0, 'published', '2019-12-27 23:22:07'),
(135, 3, 69, '\"@Nao Hijo\"', 134, 'published', '2019-12-27 23:22:13'),
(141, 7, 77, '\"@Mark This comment is about to be deleted.\"', 118, 'deleted', '2020-01-08 22:13:03');

--
-- Disparadores `image_comments`
--
DROP TRIGGER IF EXISTS `delete_children_comment`;
DELIMITER $$
CREATE TRIGGER `delete_children_comment` AFTER DELETE ON `image_comments` FOR EACH ROW BEGIN
/*
DELETE FROM image_comments
WHERE parent_id = old.id AND parent_id IS NOT NULL;
*/
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
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

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `nick`, `password`, `email`, `description`, `role`, `created_at`, `user_image`) VALUES
(3, 'Nao', 'Nao', '6dc1b00366412461aef1ad0c10332a3f4caaae8a35950160c2a989f89dae6d0c', 'nao@moonart.com', 'Hey my name is Nao and I\'m looking for new friends and artists.\\n\\nTest.\\n\\nTest 2.\\n\\nTest 3.\\n\\nTest 4.', 'role_user', '2019-04-30 23:36:22', 'GFCWNPIGHS-264185.png'),
(5, 'Mark', 'Mark', '2cb330c3a0ed2740c1f74941ee6441fac705029523d9221391689a68083a94d7', 'mark@moonart.com', 'Hola, soy Marcos, y soy el creador de esta página. Espero que os guste. :)', 'role_mod', '2019-05-03 07:48:44', 'FNXQUCMSRN-518768.jpeg'),
(6, 'Admin', 'admin', '3b612c75a7b5048a435fb6ec81e52ff92d6d795a8b5a9c17070f6a63c97a53b2', 'admin@moonart.com', NULL, 'role_admin', '2019-05-11 22:51:42', 'default.jpg'),
(7, 'Moon', 'Moon', '923654d39d69b2acf437e779fec5fc04357e415ec2036413dcf2d21e0691cf23', 'moon@moonart.com', 'Descripción de ejemplo', 'role_admin', '2019-05-11 22:57:28', 'BMKCAXHVDU-408040.jpeg'),
(8, 'Pruebass', 'Pruebas', 'cbb621efa5b1c2ae143bba29de3f6478a901e9580b4f7b39f75b58097f4ad03a', 'prueba@pruebas.com', NULL, 'role_user', '2019-05-14 09:04:00', 'ABFWDLLTVO-343545.jpeg'),
(9, 'Test', 'testacc', '9707dc58c076a752c775c9de8459278112bbdd71f98a7bb1630c10c73759fd3a', 'testacc@moonart.com', NULL, 'role_user', '2019-05-18 00:00:41', 'default.jpg'),
(10, 'Adreeaaaa', 'Adree', '17262ed77a6a26805b328d5bc3982aa1e426faf65efd6c7292a8430d8fc76622', 'adree@adree.com', NULL, 'role_user', '2019-05-20 15:04:16', 'default.jpg'),
(11, 'DemoDos', 'Demo2', 'f1284d26da298fe99ad1bc2181e9b00e3fc8191cec54a20a71af8c39e0f58259', 'demo2@moonart.com', NULL, 'role_user', '2019-05-21 07:28:03', 'default.jpg'),
(12, 'DemoTres', 'Demo3', 'e58ee84bfaf9be68ae98b482ebc8f9af71542f8963f8c61625ef9e129aaba758', 'demo3@moonart.com', 'Hola, soy una descripción de prueba.', 'role_user', '2019-05-21 07:29:09', 'QIUYAUKJCQ-016018.png'),
(13, 'DemoDos', 'Demo7', 'f1284d26da298fe99ad1bc2181e9b00e3fc8191cec54a20a71af8c39e0f58259', 'demo@moonart.com', 'Descripción de prueba', 'role_user', '2019-05-21 15:44:18', 'BRPJEUTDUK-672223.jpeg'),
(14, 'ToDelete', 'ToDelete', 'cec9a4d1e9f384e96036d9c681fed593e41384d41c5c8bc8cca7f3693875e856', 'todelete@moonart.com', NULL, 'role_user', '2020-01-02 16:40:44', 'default.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_comments`
--

DROP TABLE IF EXISTS `user_comments`;
CREATE TABLE IF NOT EXISTS `user_comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `comment_user_id` int(11) NOT NULL,
  `comment` varchar(300) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_user_comments_user` (`user_id`),
  KEY `fk_user_comments_image` (`comment_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_follows_user`
--

DROP TABLE IF EXISTS `user_follows_user`;
CREATE TABLE IF NOT EXISTS `user_follows_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `follower` int(11) NOT NULL,
  `followed` int(11) NOT NULL,
  `followed_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_user_1_id` (`follower`),
  KEY `fk_user_2_id` (`followed`)
) ENGINE=InnoDB AUTO_INCREMENT=120 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `user_follows_user`
--

INSERT INTO `user_follows_user` (`id`, `follower`, `followed`, `followed_at`) VALUES
(23, 5, 6, '2019-05-14 20:42:15'),
(24, 5, 7, '2019-05-14 20:42:38'),
(25, 5, 8, '2019-05-14 20:42:50'),
(27, 7, 8, '2019-05-15 11:15:49'),
(81, 7, 3, '2019-05-16 07:43:02'),
(86, 3, 7, '2019-05-17 18:18:06'),
(88, 3, 8, '2019-05-20 14:18:36'),
(89, 7, 5, '2019-05-20 17:43:25'),
(90, 12, 5, '2019-05-21 08:11:07'),
(91, 12, 3, '2019-05-21 08:11:18'),
(92, 12, 8, '2019-05-21 08:11:23'),
(94, 13, 5, '2019-05-21 15:49:38'),
(95, 13, 3, '2019-05-21 15:49:53'),
(114, 3, 5, '2019-12-30 00:43:39'),
(119, 5, 3, '2019-12-30 15:57:33');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_interacts_with_image`
--

DROP TABLE IF EXISTS `user_interacts_with_image`;
CREATE TABLE IF NOT EXISTS `user_interacts_with_image` (
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
  KEY `fk_interaction_user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=169 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `user_interacts_with_image`
--

INSERT INTO `user_interacts_with_image` (`id`, `user_id`, `image_id`, `liked`, `faved`, `shared`, `liked_at`, `faved_at`, `shared_at`) VALUES
(43, 5, 46, 0, 0, 1, NULL, NULL, '2019-05-05 20:09:45'),
(46, 5, 42, 1, 0, 1, '2019-05-05 20:09:49', NULL, '2019-05-16 14:49:30'),
(47, 5, 43, 1, 1, 0, '2019-05-13 18:49:43', '2019-05-13 18:45:49', NULL),
(48, 5, 44, 1, 1, 0, '2019-05-05 20:08:55', '2019-05-05 20:08:56', NULL),
(49, 5, 40, 1, 1, 1, '2019-05-05 20:08:57', '2019-05-05 20:08:58', '2019-05-05 20:08:58'),
(60, 3, 46, 1, 0, 1, '2019-05-10 23:28:01', NULL, '2019-05-08 22:34:34'),
(63, 5, 53, 1, 0, 0, '2019-05-09 19:47:53', NULL, NULL),
(69, 3, 44, 1, 0, 0, '2019-05-10 23:28:03', NULL, NULL),
(71, 3, 53, 0, 0, 0, NULL, NULL, NULL),
(72, 3, 40, 1, 1, 0, '2019-12-23 21:41:45', '2019-05-14 07:59:34', NULL),
(78, 3, 43, 1, 1, 0, '2019-05-14 07:58:39', '2019-05-14 07:59:32', NULL),
(79, 3, 42, 1, 1, 1, '2019-05-14 07:58:41', '2019-05-14 07:58:41', '2019-05-14 07:58:42'),
(84, 3, 25, 1, 0, 0, '2019-05-14 07:59:04', NULL, NULL),
(87, 8, 42, 1, 0, 1, '2019-05-14 09:37:10', NULL, '2019-05-16 11:12:02'),
(88, 8, 43, 0, 0, 1, NULL, NULL, '2019-05-16 15:36:58'),
(90, 7, 43, 1, 1, 1, '2019-05-16 08:46:15', '2019-05-16 08:46:12', '2019-05-15 07:52:43'),
(91, 7, 42, 1, 0, 1, '2019-05-16 08:26:30', NULL, '2019-05-16 08:26:31'),
(92, 7, 40, 1, 0, 1, '2019-05-16 08:43:58', NULL, '2019-05-16 08:43:59'),
(96, 8, 40, 0, 0, 1, NULL, NULL, '2019-05-16 15:36:36'),
(102, 3, 55, 1, 1, 1, '2019-05-17 10:55:18', '2019-05-17 11:38:07', '2019-05-17 10:55:16'),
(109, 3, 67, 0, 0, 1, NULL, NULL, '2019-05-17 11:50:39'),
(112, 5, 69, 1, 1, 1, '2019-05-20 07:23:39', '2019-05-20 17:40:40', '2019-05-26 22:19:11'),
(116, 8, 69, 0, 1, 1, NULL, '2019-05-17 22:22:59', '2019-05-17 22:22:58'),
(121, 5, 77, 1, 0, 1, '2019-12-25 23:05:16', NULL, '2019-05-17 23:35:11'),
(122, 3, 69, 1, 1, 1, '2020-01-08 00:31:43', '2019-05-20 12:47:43', '2019-05-20 12:47:44'),
(123, 3, 77, 1, 1, 1, '2019-12-25 01:50:09', '2019-05-20 12:47:40', '2019-07-24 22:02:42'),
(126, 3, 80, 1, 0, 0, '2019-06-13 21:14:32', NULL, NULL),
(130, 5, 80, 0, 0, 1, NULL, NULL, '2019-05-20 14:22:55'),
(131, 10, 69, 1, 0, 0, '2019-05-20 15:17:47', NULL, NULL),
(140, 7, 77, 1, 1, 1, '2019-05-20 20:59:24', '2019-05-20 21:05:23', '2019-05-20 21:05:24'),
(143, 7, 69, 1, 1, 0, '2019-05-20 22:21:32', '2019-05-20 22:21:34', NULL),
(144, 12, 55, 1, 1, 0, '2019-05-21 07:29:42', '2019-05-21 07:29:47', NULL),
(147, 12, 69, 1, 1, 1, '2019-05-21 07:33:24', '2019-05-21 07:33:24', '2019-05-21 08:12:29'),
(152, 13, 69, 1, 1, 1, '2019-05-21 15:46:09', '2019-05-21 15:46:11', '2019-05-21 15:46:14'),
(153, 13, 90, 1, 1, 1, '2019-05-21 15:48:18', '2019-05-21 15:48:19', '2019-05-21 15:47:22'),
(164, 3, 93, 1, 1, 1, '2020-01-06 01:01:18', '2020-01-08 20:32:11', '2020-01-05 22:08:35'),
(165, 7, 93, 1, 1, 1, '2020-01-08 22:11:29', '2020-01-08 22:11:30', '2020-01-08 22:11:31'),
(166, 7, 94, 0, 0, 1, NULL, NULL, '2020-01-08 22:32:24'),
(167, 3, 94, 1, 1, 1, '2020-01-08 22:46:58', '2020-01-08 22:46:14', '2020-01-08 22:47:49'),
(168, 5, 94, 1, 1, 1, '2020-01-08 22:55:23', '2020-01-08 22:49:04', '2020-01-08 22:55:02');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `config`
--
ALTER TABLE `config`
  ADD CONSTRAINT `fk_user_config` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `fk_image_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `image_comments`
--
ALTER TABLE `image_comments`
  ADD CONSTRAINT `fk_image_comments_image` FOREIGN KEY (`image_id`) REFERENCES `images` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_image_comments_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `user_comments`
--
ALTER TABLE `user_comments`
  ADD CONSTRAINT `fk_user_comments_image` FOREIGN KEY (`comment_user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `fk_user_comments_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `user_follows_user`
--
ALTER TABLE `user_follows_user`
  ADD CONSTRAINT `fk_user_1_id` FOREIGN KEY (`follower`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `fk_user_2_id` FOREIGN KEY (`followed`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `user_interacts_with_image`
--
ALTER TABLE `user_interacts_with_image`
  ADD CONSTRAINT `fk_interaction_image` FOREIGN KEY (`image_id`) REFERENCES `images` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_interaction_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
