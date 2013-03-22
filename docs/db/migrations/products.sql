SET NAMES utf8;
SET foreign_key_checks = 0;
SET time_zone = 'SYSTEM';
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `photo_uri` varchar(255) NOT NULL,
  `photo_name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` varchar(255) NOT NULL,
  `is_visible` int(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `products` (`id`, `name`, `type`, `photo_uri`, `photo_name`, `description`, `price`, `is_visible`) VALUES
(1,	'1',	'urns',	'/home/hostbaby/Sites/threadgillmemorial.com/application/../public/images/urns/2560x1600.png',	'',	'',	'',	1),
(2,	'2',	'urns',	'/home/hostbaby/Sites/threadgillmemorial.com/application/../public/images/urns/',	'',	'',	'',	1),
(3,	'3',	'urns',	'/home/hostbaby/Sites/threadgillmemorial.com/application/../public/images/urns/',	'',	'',	'',	1),
(4,	'4',	'urns',	'/home/hostbaby/Sites/threadgillmemorial.com/application/../public/images/urns/',	'',	'',	'',	1),
(5,	'Test',	'urns',	'/home/hostbaby/Sites/threadgillmemorial.com/application/../public/images/urns/supernova___1920x1080_by_abluescarab-d32hnhv.png',	'supernova___1920x1080_by_abluescarab-d32hnhv.png',	'Test',	'400',	1);

INSERT INTO `users` (`id`, `name`, `password`, `role`) VALUES
(1,	'ken',	'1234',	'admin');