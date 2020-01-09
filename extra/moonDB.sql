-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 21-05-2019 a las 07:21:07
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
CREATE DATABASE IF NOT EXISTS `moonart` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `moonart`;

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
  `lang` varchar(16) DEFAULT 'spanish',
  `color` varchar(12) DEFAULT 'blue',
  `share` tinyint(1) DEFAULT '1',
  `feed` smallint(6) DEFAULT '15',
  PRIMARY KEY (`id`),
  KEY `fk_user_config` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `config`
--

INSERT INTO `config` (`id`, `user_id`, `night_mode`, `nsfw`, `epilepsy`, `lang`, `color`, `share`, `feed`) VALUES
(4, 5, 0, 1, 1, 'spanish', 'blue', 1, 5),
(5, 3, 0, 0, 0, 'spanish', 'blue', 1, 15),
(8, 7, 1, 0, 1, 'spanish', 'blue', 1, 5),
(9, 6, 0, 1, 1, 'spanish', 'orange', 1, 15),
(10, 8, 0, 0, 0, 'spanish', 'blue', 1, 15),
(11, 10, 0, 0, 0, 'spanish', 'blue', 1, 15);

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
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `images`
--

INSERT INTO `images` (`id`, `user_id`, `url`, `name`, `description`, `status`, `nsfw`, `epilepsy`, `created_at`, `updated_at`, `rights`, `tags`) VALUES
(23, 5, 'EEXOOVJJSL-680130.png', 'Zoe', ':)', 'published', 0, 0, '2019-05-03 11:16:48', '2019-05-03 11:16:48', 'totales', NULL),
(25, 3, 'UIJJDBDTGT-782034.jpeg', 'Prueba 2', NULL, 'published', 0, 0, '2019-05-03 12:25:32', '2019-05-03 12:25:32', 'totales', NULL),
(26, 3, 'GWGMLEKXME-247656.png', 'Animu', NULL, 'published', 0, 0, '2019-05-03 14:32:37', '2019-05-03 14:32:37', 'totales', NULL),
(27, 3, 'HEHYFBHDCH-683180.jpeg', 'Yega!', 'Eren y sus amigos.', 'published', 0, 1, '2019-05-04 13:00:40', '2019-05-04 13:00:40', 'parciales', NULL),
(28, 3, 'BGXADYEFAX-555804.jpeg', 'Brown eye drawing', NULL, 'published', 0, 0, '2019-05-04 13:03:54', '2019-05-04 13:03:54', 'totales', NULL),
(29, 3, 'VJKAGRRQVK-247427.jpeg', 'Yikes', NULL, 'published', 0, 0, '2019-05-04 13:05:46', '2019-05-04 13:05:46', 'parciales', NULL),
(30, 3, 'XCASAIXWDL-478802.jpeg', 'One Punch Man @Yaaihime', NULL, 'published', 0, 0, '2019-05-04 13:07:48', '2019-05-04 13:07:48', 'totales', NULL),
(33, 3, 'IEBJDXRSBR-147148.jpeg', ':O', NULL, 'published', 0, 0, '2019-05-04 14:08:39', '2019-05-04 14:08:39', 'totales', NULL),
(35, 3, 'XVTNBBIHKG-308320.jpeg', 'Girl', NULL, 'published', 0, 0, '2019-05-04 14:19:18', '2019-05-04 14:19:18', 'totales', NULL),
(36, 3, 'MJJYSUTPRK-308853.jpeg', 'Wolf drawing', NULL, 'published', 0, 0, '2019-05-04 14:20:25', '2019-05-04 14:20:25', 'totales', NULL),
(37, 3, 'ARIPCTMLGC-138658.jpeg', 'Naruto Uzumiya', NULL, 'published', 0, 0, '2019-05-04 14:20:49', '2019-05-04 14:20:49', 'totales', NULL),
(38, 3, 'AEJEAHXPAG-321775.jpeg', 'Mariposa', NULL, 'published', 0, 0, '2019-05-04 14:22:40', '2019-05-04 14:22:40', 'totales', NULL),
(39, 3, 'DRDPXVTAUJ-236625.jpeg', 'Nadeshiko', NULL, 'published', 0, 0, '2019-05-04 14:32:52', '2019-05-04 14:32:52', 'totales', NULL),
(40, 3, 'PHRTCSRERH-603711.jpeg', 'Marco and Star', NULL, 'published', 0, 0, '2019-05-04 14:40:22', '2019-05-04 14:40:22', 'totales', NULL),
(42, 3, 'FBYKCFFSAQ-323314.jpeg', 'Eye 2', NULL, 'published', 0, 0, '2019-05-04 14:43:54', '2019-05-04 14:43:54', 'totales', NULL),
(43, 3, 'QRAVPCYFYJ-177212.jpeg', 'Mimikyu', 'Da yo', 'hidden', 0, 0, '2019-05-04 14:48:21', '2019-05-04 14:48:21', 'totales', NULL),
(44, 3, 'JCKTEKXNHM-421210.jpeg', 'Anime girl', NULL, 'hidden', 0, 0, '2019-05-04 14:51:42', '2019-05-04 14:51:42', 'totales', NULL),
(46, 3, 'PKDSGUDHDD-165858.jpeg', 'Yuno', NULL, 'hidden', 0, 0, '2019-05-04 15:22:32', '2019-05-04 15:22:32', 'totales', NULL),
(53, 3, 'UGMTQXGYUN-880017.jpeg', 'Hug from behind', 'Yui hugging Azu-nyan', 'hidden', 0, 0, '2019-05-09 19:44:27', '2019-05-09 19:44:27', 'parciales', 'Yui, Azusa, hug'),
(54, 3, 'CPQFIPGYAF-165807.jpeg', 'Space', 'Ohhhhh', 'published', 0, 1, '2019-05-09 19:45:12', '2019-05-09 19:45:12', 'ninguno', 'Nebulilla'),
(55, 5, 'RUFIHAFWJA-035470.jpeg', 'Awaken', 'From league of legends.\\nGreat clip.\\n:D', 'published', 0, 0, '2019-05-16 18:45:00', '2019-05-16 18:45:00', 'totales', 'riven, awaken, lol'),
(56, 5, 'BKELMWHIAC-446843.jpeg', 'Lux', 'Luxanna Crownward', 'published', 0, 0, '2019-05-16 18:48:17', '2019-05-16 18:48:17', 'parciales', 'lux, lol, league, of, legends'),
(58, 5, 'YUWKJFUTHU-208400.jpeg', 'Ayaya', NULL, 'published', 0, 0, '2019-05-16 18:49:59', '2019-05-16 18:49:59', 'totales', NULL),
(61, 5, 'KLNXVWWVGP-833324.jpeg', 'Pokemon girl', 'No me sé su nombre...', 'published', 0, 0, '2019-05-17 09:10:37', '2019-05-17 09:10:37', 'totales', 'pokemon, girl'),
(62, 5, 'SPYQBHXFXW-810866.jpeg', 'Shinzou wo Sasageyo', 'Fanart de Attack on Titan. Salen:\\n\\n- Eren\\n- Mikasa\\n- Armin', 'published', 0, 0, '2019-05-17 09:17:48', '2019-05-17 09:17:48', 'totales', 'snk,shingeki, kyojin, attack, on, titan, eren, mikasa, armin'),
(63, 5, 'SORKJLGCSL-316285.png', 'Hisu', 'Historia Reiss.', 'published', 0, 0, '2019-05-17 09:19:47', '2019-05-17 09:19:47', 'totales', 'historia,reiss,christa,spoilers,shingeki,kyojin,attack,titan'),
(67, 3, 'SCMTTLRTTY-377341.jpeg', 'Not today...alert(\"err\");... but good try.', 'Not today...alert(\"err\");... but good try.', 'hidden', 0, 0, '2019-05-17 11:50:39', '2019-05-17 11:50:39', 'totales', 'Not today...alert(\"err\");... but good try.'),
(69, 5, 'SHUHPVWTYI-843660.png', 'Zoe lol', 'Un dibujo de Zoe poniendo cara de poco agrado.\\n\\nColoreada con Photoshop CC por @skittlebug94.\\n\\n2019\\n', 'published', 0, 0, '2019-05-17 21:24:27', '2019-05-17 21:24:27', 'ninguno', 'zoe,coffee,dislike,face,weird,lol'),
(74, 5, 'OAHJTSWGUP-214447.png', 'Blur', 'Contenido sensible', 'published', 1, 0, '2019-05-17 23:33:44', '2019-05-17 23:33:44', 'totales', 'contenido,sensible'),
(76, 5, 'FQINJOMGOM-316023.png', 'XD', NULL, 'published', 1, 0, '2019-05-17 23:34:41', '2019-05-17 23:34:41', 'totales', NULL),
(77, 5, 'OWCMXSRJBS-620601.png', 'XD', NULL, 'published', 0, 1, '2019-05-17 23:35:11', '2019-05-17 23:35:11', 'totales', NULL),
(80, 3, 'QXTDYHWRIJ-201554.jpeg', 'Taliyah', 'Tali', 'hidden', 0, 0, '2019-05-20 12:58:02', '2019-05-20 12:58:02', 'totales', 'league, legends, league of legends, prueba, prueba xd, a ver si va, trim');

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
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_image_comments_image` (`image_id`),
  KEY `fk_image_comments_user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `image_comments`
--

INSERT INTO `image_comments` (`id`, `user_id`, `image_id`, `comment`, `created_at`) VALUES
(1, 3, 53, 'Está genial', '2019-05-12 15:49:07'),
(2, 3, 53, 'Me gusta.', '2019-05-12 16:23:08'),
(21, 3, 53, '\n', '2019-05-12 16:59:39'),
(23, 3, 53, 'Y aquí si?', '2019-05-12 17:34:01'),
(36, 5, 53, 'Pureba\\nA ver\\nSi va', '2019-05-13 01:56:13'),
(37, 5, 53, 'Múltiples\\nMultilíneas\\nProbando\\nA ver\\n si\\nVa?', '2019-05-13 02:06:16'),
(38, 5, 53, 'Next', '2019-05-13 02:06:56'),
(39, 5, 53, '<script></script>', '2019-05-13 02:08:30'),
(40, 5, 53, '<h1> :) </h1>', '2019-05-13 02:09:04'),
(41, 5, 43, ':)', '2019-05-13 13:39:52'),
(42, 5, 40, 'Prueba', '2019-05-14 22:10:06'),
(46, 3, 23, 'Lo has hecho tu? :)', '2019-05-17 19:16:16'),
(47, 5, 23, 'No, es Zoe, un personaje de un juego.', '2019-05-17 19:17:18'),
(48, 3, 23, 'Ahhhh', '2019-05-17 19:17:45'),
(50, 5, 69, 'Es muy bonito el dibujo.', '2019-05-17 22:25:58'),
(51, 5, 63, 'Nice :D', '2019-05-20 09:56:49'),
(63, 3, 69, '@Mark ^^', '2019-05-20 11:40:50'),
(66, 3, 80, 'Mola :)', '2019-05-20 13:52:10'),
(77, 7, 62, 'Me encanta esa serie', '2019-05-20 20:58:11');

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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `nick`, `password`, `email`, `description`, `role`, `created_at`, `user_image`) VALUES
(3, 'Nao', 'Nao', '6dc1b00366412461aef1ad0c10332a3f4caaae8a35950160c2a989f89dae6d0c', 'nao@moonart.com', 'Hey my name is Nao and I\m looking for new friends and artists.', 'role_user', '2019-04-30 23:36:22', 'OCAGWVEAUR-266044.jpeg'),
(5, 'Marks', 'Mark', '2cb330c3a0ed2740c1f74941ee6441fac705029523d9221391689a68083a94d7', 'mark@moonart.com', 'Hola buenas, soy Marcos, y soy el creador de esta página. Espero que os guste. :)', 'role_mod', '2019-05-03 07:48:44', 'FNXQUCMSRN-518768.jpeg'),
(6, 'Admin', 'admin', '3b612c75a7b5048a435fb6ec81e52ff92d6d795a8b5a9c17070f6a63c97a53b2', 'admin@moonart.com', NULL, 'role_admin', '2019-05-11 22:51:42', 'default.jpg'),
(7, 'Moon', 'Moon', '923654d39d69b2acf437e779fec5fc04357e415ec2036413dcf2d21e0691cf23', 'moon@moonart.com', 'Descripción de ejemplo', 'role_admin', '2019-05-11 22:57:28', 'BMKCAXHVDU-408040.jpeg'),
(8, 'Pruebass', 'Pruebas', 'cbb621efa5b1c2ae143bba29de3f6478a901e9580b4f7b39f75b58097f4ad03a', 'prueba@pruebas.com', NULL, 'role_user', '2019-05-14 09:04:00', 'ABFWDLLTVO-343545.jpeg'),
(9, 'Test', 'testacc', '9707dc58c076a752c775c9de8459278112bbdd71f98a7bb1630c10c73759fd3a', 'testacc@moonart.com', NULL, 'role_user', '2019-05-18 00:00:41', 'default.jpg'),
(10, 'Adreeaaaa', 'Adree', '17262ed77a6a26805b328d5bc3982aa1e426faf65efd6c7292a8430d8fc76622', 'adree@adree.com', NULL, 'role_user', '2019-05-20 15:04:16', 'default.jpg');

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
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `user_follows_user`
--

INSERT INTO `user_follows_user` (`id`, `follower`, `followed`, `followed_at`) VALUES
(19, 3, 5, '2019-05-12 17:32:47'),
(23, 5, 6, '2019-05-14 20:42:15'),
(24, 5, 7, '2019-05-14 20:42:38'),
(25, 5, 8, '2019-05-14 20:42:50'),
(27, 7, 8, '2019-05-15 11:15:49'),
(81, 7, 3, '2019-05-16 07:43:02'),
(86, 3, 7, '2019-05-17 18:18:06'),
(87, 5, 3, '2019-05-20 07:25:33'),
(88, 3, 8, '2019-05-20 14:18:36'),
(89, 7, 5, '2019-05-20 17:43:25');

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
) ENGINE=InnoDB AUTO_INCREMENT=144 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `user_interacts_with_image`
--

INSERT INTO `user_interacts_with_image` (`id`, `user_id`, `image_id`, `liked`, `faved`, `shared`, `liked_at`, `faved_at`, `shared_at`) VALUES
(43, 5, 46, 0, 0, 1, NULL, NULL, '2019-05-05 20:09:45'),
(46, 5, 42, 1, 0, 1, '2019-05-05 20:09:49', NULL, '2019-05-16 14:49:30'),
(47, 5, 43, 1, 1, 0, '2019-05-13 18:49:43', '2019-05-13 18:45:49', NULL),
(48, 5, 44, 1, 1, 0, '2019-05-05 20:08:55', '2019-05-05 20:08:56', NULL),
(49, 5, 40, 1, 1, 1, '2019-05-05 20:08:57', '2019-05-05 20:08:58', '2019-05-05 20:08:58'),
(50, 5, 39, 1, 0, 1, '2019-05-05 20:09:19', NULL, '2019-05-16 14:49:32'),
(51, 5, 38, 1, 1, 0, '2019-05-05 20:09:51', '2019-05-06 19:19:04', NULL),
(52, 5, 37, 1, 0, 0, '2019-05-05 20:10:43', NULL, NULL),
(53, 5, 33, 1, 0, 0, '2019-05-05 20:10:44', NULL, NULL),
(55, 5, 35, 1, 1, 0, '2019-05-05 20:09:41', '2019-05-05 20:09:42', NULL),
(56, 5, 36, 0, 1, 1, NULL, '2019-05-05 20:09:00', '2019-05-05 20:09:00'),
(58, 5, 30, 1, 0, 1, '2019-05-07 17:31:57', NULL, '2019-05-07 17:31:58'),
(60, 3, 46, 1, 0, 1, '2019-05-10 23:28:01', NULL, '2019-05-08 22:34:34'),
(63, 5, 53, 1, 0, 0, '2019-05-09 19:47:53', NULL, NULL),
(65, 5, 54, 1, 0, 0, '2019-05-09 19:47:57', NULL, NULL),
(67, 3, 54, 1, 0, 0, '2019-05-10 23:40:41', NULL, NULL),
(69, 3, 44, 1, 0, 0, '2019-05-10 23:28:03', NULL, NULL),
(70, 3, 23, 1, 1, 1, '2019-05-11 03:14:15', '2019-05-11 03:14:16', '2019-05-11 03:14:17'),
(71, 3, 53, 0, 0, 0, NULL, NULL, NULL),
(72, 3, 40, 1, 1, 0, '2019-05-14 07:59:11', '2019-05-14 07:59:34', NULL),
(73, 5, 23, 1, 0, 0, '2019-05-14 07:46:40', NULL, NULL),
(74, 3, 38, 1, 0, 0, '2019-05-14 07:51:59', NULL, NULL),
(75, 3, 37, 1, 0, 0, '2019-05-14 07:58:30', NULL, NULL),
(76, 3, 36, 1, 1, 0, '2019-05-14 07:58:32', '2019-05-14 07:59:21', NULL),
(77, 3, 29, 1, 0, 0, '2019-05-14 07:58:34', NULL, NULL),
(78, 3, 43, 1, 1, 0, '2019-05-14 07:58:39', '2019-05-14 07:59:32', NULL),
(79, 3, 42, 1, 1, 1, '2019-05-14 07:58:41', '2019-05-14 07:58:41', '2019-05-14 07:58:42'),
(80, 3, 39, 1, 1, 1, '2019-05-14 07:58:56', '2019-05-14 07:59:17', '2019-05-16 19:34:09'),
(81, 3, 35, 1, 0, 0, '2019-05-14 07:58:57', NULL, NULL),
(82, 3, 33, 1, 0, 0, '2019-05-14 07:58:59', NULL, NULL),
(83, 3, 30, 1, 0, 0, '2019-05-14 07:59:00', NULL, NULL),
(84, 3, 25, 1, 0, 0, '2019-05-14 07:59:04', NULL, NULL),
(85, 3, 26, 1, 1, 0, '2019-05-14 07:59:05', '2019-05-14 08:01:55', NULL),
(86, 3, 28, 1, 0, 0, '2019-05-14 07:59:06', NULL, NULL),
(87, 8, 42, 1, 0, 1, '2019-05-14 09:37:10', NULL, '2019-05-16 11:12:02'),
(88, 8, 43, 0, 0, 1, NULL, NULL, '2019-05-16 15:36:58'),
(89, 7, 54, 1, 1, 1, '2019-05-16 07:59:44', '2019-05-16 07:59:48', '2019-05-16 07:56:16'),
(90, 7, 43, 1, 1, 1, '2019-05-16 08:46:15', '2019-05-16 08:46:12', '2019-05-15 07:52:43'),
(91, 7, 42, 1, 0, 1, '2019-05-16 08:26:30', NULL, '2019-05-16 08:26:31'),
(92, 7, 40, 1, 0, 1, '2019-05-16 08:43:58', NULL, '2019-05-16 08:43:59'),
(93, 8, 26, 0, 0, 1, NULL, NULL, '2019-05-15 11:15:31'),
(94, 7, 23, 1, 0, 0, '2019-05-15 11:36:44', NULL, NULL),
(96, 8, 40, 0, 0, 1, NULL, NULL, '2019-05-16 15:36:36'),
(99, 5, 61, 0, 0, 1, NULL, NULL, '2019-05-17 09:10:38'),
(100, 5, 62, 0, 0, 1, NULL, NULL, '2019-05-17 09:17:48'),
(101, 5, 63, 0, 0, 1, NULL, NULL, '2019-05-17 09:19:48'),
(102, 3, 55, 1, 1, 1, '2019-05-17 10:55:18', '2019-05-17 11:38:07', '2019-05-17 10:55:16'),
(103, 3, 62, 0, 0, 1, NULL, NULL, '2019-05-17 10:59:54'),
(104, 3, 63, 0, 0, 1, NULL, NULL, '2019-05-17 11:00:49'),
(107, 3, 56, 1, 1, 0, '2019-05-17 11:37:53', '2019-05-17 11:38:15', NULL),
(109, 3, 67, 0, 0, 1, NULL, NULL, '2019-05-17 11:50:39'),
(112, 5, 69, 1, 1, 1, '2019-05-20 07:23:39', '2019-05-20 17:40:40', '2019-05-20 17:40:39'),
(115, 5, 56, 1, 0, 1, '2019-05-17 22:10:23', NULL, '2019-05-17 22:10:24'),
(116, 8, 69, 0, 1, 1, NULL, '2019-05-17 22:22:59', '2019-05-17 22:22:58'),
(118, 5, 74, 0, 0, 1, NULL, NULL, '2019-05-17 23:33:44'),
(120, 5, 76, 0, 0, 1, NULL, NULL, '2019-05-17 23:34:41'),
(121, 5, 77, 0, 0, 1, NULL, NULL, '2019-05-17 23:35:11'),
(122, 3, 69, 1, 1, 1, '2019-05-18 18:40:28', '2019-05-20 12:47:43', '2019-05-20 12:47:44'),
(123, 3, 77, 1, 1, 0, '2019-05-20 12:47:37', '2019-05-20 12:47:40', NULL),
(126, 3, 80, 1, 0, 0, '2019-05-20 14:00:06', NULL, NULL),
(127, 8, 63, 0, 0, 1, NULL, NULL, '2019-05-20 14:18:22'),
(128, 8, 62, 0, 0, 1, NULL, NULL, '2019-05-20 14:18:23'),
(129, 8, 61, 0, 0, 1, NULL, NULL, '2019-05-20 14:18:46'),
(130, 5, 80, 0, 0, 1, NULL, NULL, '2019-05-20 14:22:55'),
(131, 10, 69, 1, 0, 0, '2019-05-20 15:17:47', NULL, NULL),
(134, 7, 63, 1, 0, 0, '2019-05-20 20:48:13', NULL, NULL),
(138, 7, 62, 1, 1, 1, '2019-05-20 20:57:48', '2019-05-20 20:57:53', '2019-05-20 20:57:49'),
(139, 7, 62, 0, 1, 0, NULL, '2019-05-20 20:56:23', NULL),
(140, 7, 77, 1, 1, 1, '2019-05-20 20:59:24', '2019-05-20 21:05:23', '2019-05-20 21:05:24'),
(141, 7, 74, 1, 0, 0, '2019-05-20 20:59:25', NULL, NULL),
(142, 7, 76, 1, 0, 0, '2019-05-20 20:59:39', NULL, NULL),
(143, 7, 69, 1, 1, 0, '2019-05-20 22:21:32', '2019-05-20 22:21:34', NULL);

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
