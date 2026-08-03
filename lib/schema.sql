-- Flights Club UK — Admin Panel Database Schema
-- Run this once against your Hostinger MySQL database (via hPanel's phpMyAdmin,
-- or `mysql -h HOST -u USER -p DBNAME < lib/schema.sql`) before using /admin
-- or running `npm run db:seed`.

CREATE TABLE IF NOT EXISTS packages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(191) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  image TEXT NOT NULL,
  duration VARCHAR(64) NOT NULL,
  nights INT NOT NULL,
  price INT NOT NULL,
  original_price INT NULL,
  airline VARCHAR(255) NOT NULL,
  hotel VARCHAR(255) NOT NULL,
  hotel_stars TINYINT NOT NULL DEFAULT 5,
  board VARCHAR(64) NOT NULL,
  transfers TINYINT(1) NOT NULL DEFAULT 1,
  category ENUM('beach', 'city', 'luxury', 'family', 'honeymoon') NOT NULL,
  highlights JSON NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS destinations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(191) NOT NULL UNIQUE,
  city VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  image TEXT NOT NULL,
  from_price INT NOT NULL,
  blurb TEXT NOT NULL,
  region ENUM('uk', 'europe', 'middleeast', 'asia', 'americas', 'oceania') NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
