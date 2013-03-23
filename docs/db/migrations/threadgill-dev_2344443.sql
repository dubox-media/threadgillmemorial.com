-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 23, 2013 at 06:29 AM
-- Server version: 5.5.24-log
-- PHP Version: 5.4.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `threadgill-dev_2344443`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `photo_uri` varchar(255) DEFAULT NULL,
  `photo_name` varchar(255) DEFAULT NULL,
  `description` text,
  `price` varchar(255) NOT NULL,
  `is_visible` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `type`, `photo_uri`, `photo_name`, `description`, `price`, `is_visible`) VALUES
(3, 'Atlantic 20 gauge steel', 'caskets', '/images/caskets/atlantic-white.jpg', 'atlantic-white.jpg', 'White Shaded Silver Rose finish  with Pink Crepe interior  also comes in Monarch Blue and Silver finish', '$2080', 'true'),
(4, 'Mercury 20 gauge steel', 'caskets', '/images/caskets/mercury-orchid.jpg', 'mercury-orchid.jpg', 'Orchid Shaded Silver Finish with Pink Crepe interior, also comes in blue and copper bronze.', '$1860', 'true'),
(5, 'Logan 18 gauge steel', 'caskets', '/images/caskets/logan-sIlver-rose.jpg', 'logan-sIlver-rose.jpg', 'Silver Rose finish with Pink Rose Crepe interior, also comes in Silver, Spruce Blue and Bronze  finish.', '$1480', 'true'),
(6, 'Cambridge', 'caskets', '/images/caskets/cambridge.jpg', 'cambridge.jpg', 'Golden Walnut Finish with Ivory Suede interior.', '$1930', 'true'),
(7, 'Shellbrook', 'caskets', '/images/caskets/shellbrook.jpg', 'shellbrook.jpg', 'Shellbrook - Cherry Finish  with Rosetan crepe interior. Pleated fan on head panel.', '$1560', 'true'),
(8, 'Blue Cloisonne Butterfly Selection', 'urns', '/images/urns/etienne-butterfly.png', 'etienne-butterfly.png', 'Blue Butterfly Ettienne Selection.', 'Large $199,  Keepsake $79, Heart $99', 'true'),
(9, 'Eagle Patriot', 'urns', '/images/urns/eagle.jpg', 'eagle.jpg', 'Large Brass Urn with Eagle in Flight against an American Flag.', 'Large $199', 'true'),
(10, 'Essence Cloisonne Urn Selection', 'urns', '/images/urns/essence-rose.png', 'essence-rose.png', 'Rose, also comes in Blue Azure.', 'Large $199, Keepsake $79, Heart $99', 'true'),
(11, 'Mackenzie Cultured Marble Urn/Vault combination', 'urns', '/images/urns/Amethyst.jpg', 'Amethyst.jpg', 'Amethyst, Navy, Wedgewood, Wild Rose, Ebony, Verde green, White, Rose, Purple - these urns can also be used as a burial urn.', '$220', 'true'),
(12, 'Twilight Lilac', 'urns', '/images/urns/twilight.jpg', 'twilight.jpg', 'Twilight Lilac Brass Urn Selection.', 'Large $199, Keepsake $79, Heart $99', 'true');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `name` (`name`,`password`),
  KEY `role` (`role`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `password`, `role`) VALUES
(1, 'ken', '1234', 'admin');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
