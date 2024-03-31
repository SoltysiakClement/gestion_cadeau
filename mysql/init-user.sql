CREATE USER IF NOT EXISTS 'user'@'%' IDENTIFIED WITH mysql_native_password BY '456';
GRANT ALL PRIVILEGES ON `gestion_cadeau`.* TO 'user'@'%';
FLUSH PRIVILEGES;