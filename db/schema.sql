-- Drop the existing database if it exists
DROP DATABASE IF EXISTS tabletop_db;

-- Create the main database
CREATE DATABASE tabletop_db;

-- Select the newly created database for use
USE tabletop_db;

-- Create a table for storing chat messages
CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);