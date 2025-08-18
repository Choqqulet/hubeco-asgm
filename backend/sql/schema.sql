CREATE TABLE IF NOT EXISTS users(
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(80),
  email VARCHAR(120) UNIQUE,
  password_hash VARCHAR(255),
  role ENUM('resident','admin') DEFAULT 'resident',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS recycle_points(
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120),
  address VARCHAR(255),
  latitude DECIMAL(9,6),
  longitude DECIMAL(9,6),
  materials SET('paper','plastic','metal','glass','ewaste') NOT NULL
);

CREATE TABLE IF NOT EXISTS pickup_schedules(
  id INT AUTO_INCREMENT PRIMARY KEY,
  area VARCHAR(120),
  day ENUM('Mon','Tue','Wed','Thu','Fri','Sat','Sun'),
  time_range VARCHAR(40)
);

CREATE TABLE IF NOT EXISTS energy_tips(
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(160),
  body TEXT,
  category ENUM('lighting','appliances','cooling','water')
);

CREATE TABLE IF NOT EXISTS gardens(
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120),
  location VARCHAR(255),
  total_plots INT DEFAULT 0,
  taken_plots INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS garden_signups(
  id INT AUTO_INCREMENT PRIMARY KEY,
  garden_id INT,
  user_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(garden_id) REFERENCES gardens(id),
  FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS swap_items(
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  title VARCHAR(160),
  description TEXT,
  category ENUM('books','clothes','home','electronics','other'),
  image_url VARCHAR(255),
  status ENUM('active','reserved','closed') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(user_id) REFERENCES users(id)
);
