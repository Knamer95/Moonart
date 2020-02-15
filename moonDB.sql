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

DROP DATABASE IF EXISTS `moonart`;
CREATE DATABASE `moonart`;
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
(4, 5, 1, 0, 0, 2, 'orange', 1, 5),
(5, 3, 1, 0, 1, 1, 'orange', 1, 5),
(8, 7, 1, 1, 1, 1, 'orange', 1, 5),
(9, 6, 0, 1, 1, 1, 'orange', 1, 15);

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
(7, 'Moon', 'Moon', '923654d39d69b2acf437e779fec5fc04357e415ec2036413dcf2d21e0691cf23', 'moon@moonart.com', 'Descripción de ejemplo', 'role_admin', '2019-05-11 22:57:28', 'BMKCAXHVDU-408040.jpeg');
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