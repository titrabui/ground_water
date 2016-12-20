-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 20, 2016 at 09:14 PM
-- Server version: 10.1.19-MariaDB
-- PHP Version: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `groundwater`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `addnewwatervaluebycolumnid` (IN `water_column_id` INT(11), IN `value` FLOAT)  NO SQL
INSERT INTO water_column_value (water_column_value.water_column_id, water_column_value.value) VALUES (water_column_id, value)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `creategroupwatercolumn` (IN `area_id` INT(11) UNSIGNED, IN `name` VARCHAR(50) CHARSET utf8, IN `latitude` DOUBLE, IN `longitude` DOUBLE, IN `note` VARCHAR(50) CHARSET utf8)  NO SQL
INSERT INTO `group_water_column`(`area_id`, `name`, `latitude`, `longitude`, `note`) VALUES (area_id, name, latitude, longitude, note)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `createwatercolumn` (IN `group_water_column_id` INT(11) UNSIGNED, IN `name` VARCHAR(255), IN `height` INT, IN `latitude` INT, IN `longitude` INT, IN `note` VARCHAR(255), IN `gsmnumber` INT)  NO SQL
INSERT INTO `water_column`(`group_water_column_id`, `name`, `height`, `latitude`, `longitude`, `note`, `gsmnumber`) VALUES (group_water_column_id, name, height, latitude, longitude, note, gsmnumber)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deletegroupwatercolumn` (IN `id` INT(11) UNSIGNED)  NO SQL
DELETE FROM `group_water_column` WHERE `group_water_column`.`id` = id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deletewatercolumn` (IN `id` INT(11))  NO SQL
DELETE FROM `water_column` WHERE `water_column`.`id` = id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deletewatercolumnvalue` (IN `id` INT(11) UNSIGNED)  NO SQL
DELETE FROM water_column_value WHERE water_column_value.id = id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `editgroupwatercolumn` (IN `id` INT(11) UNSIGNED, IN `name` VARCHAR(50) CHARSET utf8, IN `latitude` DOUBLE, IN `longitude` DOUBLE, IN `note` VARCHAR(50) CHARSET utf8)  NO SQL
UPDATE `group_water_column` SET `name`=name,`latitude`=latitude,`longitude`=longitude,`note`=note,`updated_at`=NOW() WHERE `group_water_column`.`id`=id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `editwatercolumn` (IN `id` INT(11) UNSIGNED, IN `name` VARCHAR(255), IN `height` INT, IN `latitude` DOUBLE, IN `longitude` DOUBLE, IN `note` VARCHAR(255), IN `gsmnumber` INT)  NO SQL
UPDATE `water_column` SET water_column.`name`=name,water_column.`height`=height,water_column.`latitude`=latitude,water_column.`longitude`=longitude,water_column.`note`=note,water_column.`gsmnumber`= gsmnumber,water_column.`updated_at`=NOW() WHERE water_column.`id`= id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `editwatercolumnvalue` (IN `id` INT(11) UNSIGNED, IN `columnvalue` FLOAT, IN `note` VARCHAR(255), IN `created_at` DATETIME)  NO SQL
UPDATE `water_column_value` SET `value`=columnvalue,`note`=note,`created_at`=created_at WHERE water_column_value.id = id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getgroupbyareaid` (IN `area_id` INT(11))  NO SQL
SELECT * FROM group_water_column WHERE group_water_column.area_id = area_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getwatercolumnbygroupid` (IN `group_water_column_id` INT(11))  NO SQL
SELECT * FROM water_column WHERE water_column.group_water_column_id = group_water_column_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getwatervaluebycolumnid` (IN `water_column_id` INT(11))  NO SQL
SELECT * FROM water_column_value WHERE water_column_value.water_column_id = water_column_id ORDER BY water_column_value.created_at DESC$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getwatervaluebycolumnidandday` (IN `water_column_id` INT(11), IN `date` DATETIME)  NO SQL
SELECT * FROM water_column_value WHERE water_column_value.water_column_id = water_column_id AND DAY(water_column_value.created_at) = DAY(date) AND MONTH(water_column_value.created_at) = MONTH(date) AND YEAR(water_column_value.created_at) = YEAR(date)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `login` (IN `username` VARCHAR(50), IN `password` VARCHAR(50))  NO SQL
SELECT * FROM user WHERE user.username = username AND user.password = password$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `requestwatercolumn` (IN `id` INT(11) UNSIGNED)  NO SQL
UPDATE `water_column` SET `is_request`= 1 WHERE `water_column`.`id` = id$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `area`
--

CREATE TABLE `area` (
  `id` int(11) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phonenumber` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `note` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `area`
--

INSERT INTO `area` (`id`, `name`, `address`, `phonenumber`, `email`, `latitude`, `longitude`, `note`, `created_at`, `updated_at`) VALUES
(1, 'Hồ Hòa Trung', 'Đà Nẵng', '0511517838', 'ktlv@gmail.com', 1, 1, NULL, '2016-12-08 02:34:13', '2016-12-08 02:34:13');

-- --------------------------------------------------------

--
-- Table structure for table `group_water_column`
--

CREATE TABLE `group_water_column` (
  `id` int(11) NOT NULL,
  `area_id` int(11) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `note` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `group_water_column`
--

INSERT INTO `group_water_column` (`id`, `area_id`, `name`, `latitude`, `longitude`, `note`, `created_at`, `updated_at`) VALUES
(1, 1, 'Vùng Thượng Lưu Phía Bắc', 1, 1, 'xcxxcxcsdsdsdsds', '2016-12-08 02:34:43', '2016-12-18 01:36:31'),
(2, 1, 'Vùng Thượng Lưu Phía Tây', 1, 1, 'sdsdsds', '2016-12-08 02:34:57', '2016-12-17 15:36:30'),
(3, 1, 'Vùng Hạ Lưu Phía Nam', 1, 1, 'fdfdfdf', '2016-12-08 02:35:26', '2016-12-17 15:39:02'),
(4, 1, 'Vùng Hạ Lưu Phía Đông', 1, 1, NULL, '2016-12-08 02:35:38', '2016-12-08 02:35:38'),
(5, 1, 'Vùng Hạ Lưu Phía Đông Nam', 1, 2, 'dfdfdfdfd', '2016-12-11 02:25:19', '2016-12-11 20:31:55'),
(6, 1, 'fgfgfgfgfgf', 1, 1, 'dffsdfs', '2016-12-11 03:51:11', '2016-12-11 17:06:32'),
(7, 1, 'badffd', 3, 4, 'fffffffffffffffffffffff', '2016-12-11 03:58:15', '2016-12-11 17:06:44'),
(8, 1, 'qwerere', 1, 1, 'dfdfdf', '2016-12-11 04:00:50', '2016-12-11 04:00:50'),
(9, 1, 'sddsds1', 1, 1, 'dsdsds', '2016-12-11 04:03:09', '2016-12-11 04:03:09'),
(10, 1, 'sddsds2', 1, 1, 'fdfddf', '2016-12-11 09:02:04', '2016-12-11 09:02:04'),
(12, 1, 'dfdfdfdf', 0, 0, 'fdfdfdfdf', '2016-12-11 09:21:40', '2016-12-11 20:34:27'),
(13, 1, '', 0, 0, '', '2016-12-11 09:24:43', '2016-12-11 09:24:43'),
(14, 1, 'sddsds3', 1, 1, 'dfdfdfdfdfd', '2016-12-11 09:34:48', '2016-12-11 09:34:48'),
(15, 1, 'sddsds4', 1, 1, 'dffdd', '2016-12-11 09:37:36', '2016-12-11 09:37:36');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `role` int(11) NOT NULL,
  `fullname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phonenumber` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `note` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `role`, `fullname`, `address`, `email`, `phonenumber`, `note`, `created_at`, `updated_at`) VALUES
(1, 'admin', '123', 1, NULL, NULL, NULL, NULL, NULL, '2016-12-20 22:23:56', '2016-12-20 22:23:56');

-- --------------------------------------------------------

--
-- Table structure for table `water_column`
--

CREATE TABLE `water_column` (
  `id` int(11) NOT NULL,
  `group_water_column_id` int(11) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `height` float DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `note` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gsmnumber` varchar(20) DEFAULT NULL,
  `is_request` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `water_column`
--

INSERT INTO `water_column` (`id`, `group_water_column_id`, `name`, `height`, `latitude`, `longitude`, `note`, `gsmnumber`, `is_request`, `created_at`, `updated_at`) VALUES
(5, 1, 'Cột số 1', 0, 12, 1, 'dfdfdfd', '0', 1, '2016-12-12 05:14:36', '2016-12-20 01:33:37'),
(6, 2, 'Cột số 2', 0, 0, NULL, NULL, NULL, 0, '2016-12-12 05:14:36', '2016-12-12 05:14:36'),
(7, 1, 'Cột số 3', 232, 232, 0, 'dfdfdfd', '0', 0, '2016-12-12 05:15:00', '2016-12-12 05:17:42'),
(8, 2, 'Cột số 4', 23, 232, NULL, NULL, NULL, 0, '2016-12-12 05:15:00', '2016-12-12 05:15:00'),
(9, 1, 'Cột số 2', 40, 1, 1, 'sddsd', '23323', 0, '2016-12-20 01:25:29', '2016-12-20 01:25:29');

-- --------------------------------------------------------

--
-- Table structure for table `water_column_value`
--

CREATE TABLE `water_column_value` (
  `id` int(11) NOT NULL,
  `water_column_id` int(11) NOT NULL,
  `value` float NOT NULL DEFAULT '0',
  `note` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `water_column_value`
--

INSERT INTO `water_column_value` (`id`, `water_column_id`, `value`, `note`, `created_at`, `updated_at`) VALUES
(6, 5, 10999, ' hdbhbhbhd', '2016-12-08 04:51:13', '2016-12-08 04:51:13'),
(7, 6, 12, NULL, '2016-12-08 10:03:27', '2016-12-08 10:03:27'),
(8, 7, 19, NULL, '2016-12-08 16:20:10', '2016-12-08 16:20:10'),
(9, 9, 10, NULL, '2016-12-08 16:20:22', '2016-12-08 16:20:22'),
(10, 10, 15, NULL, '2016-12-08 16:20:33', '2016-12-08 16:20:33'),
(11, 6, 12, NULL, '2016-12-08 16:20:41', '2016-12-08 16:20:41'),
(12, 8, 35, NULL, '2016-12-08 16:20:52', '2016-12-08 16:20:52'),
(13, 0, 232332, NULL, '2016-12-21 02:20:37', '2016-12-21 02:20:37'),
(14, 0, 232332, NULL, '2016-12-21 02:20:51', '2016-12-21 02:20:51'),
(15, 0, 2323230, NULL, '2016-12-21 02:23:11', '2016-12-21 02:23:11'),
(16, 0, 32323200000, NULL, '2016-12-21 02:25:26', '2016-12-21 02:25:26'),
(17, 5, 3323230, NULL, '2016-12-21 02:28:22', '2016-12-21 02:28:22'),
(18, 5, 1099960000, NULL, '2016-12-21 02:30:26', '2016-12-21 02:30:26'),
(19, 5, 1.09996e15, NULL, '2016-12-21 02:31:40', '2016-12-21 02:31:40'),
(20, 5, 10999, 'sdsdsds', '2016-12-21 02:48:34', '2016-12-21 02:48:34');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `area`
--
ALTER TABLE `area`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `group_water_column`
--
ALTER TABLE `group_water_column`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `water_column`
--
ALTER TABLE `water_column`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `water_column_value`
--
ALTER TABLE `water_column_value`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `area`
--
ALTER TABLE `area`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `group_water_column`
--
ALTER TABLE `group_water_column`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `water_column`
--
ALTER TABLE `water_column`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `water_column_value`
--
ALTER TABLE `water_column_value`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
