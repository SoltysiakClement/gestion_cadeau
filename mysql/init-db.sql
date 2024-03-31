-- Supprime la base de données si elle existe déjà
DROP DATABASE IF EXISTS gestion_cadeau;

-- Crée la base de données
CREATE DATABASE gestion_cadeau;

-- Sélectionne la base de données à utiliser
USE gestion_cadeau;

-- Crée une table pour les listes
CREATE TABLE listes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    description TEXT,
    dateFin DATE,
    enCours BOOLEAN DEFAULT TRUE
);

CREATE TABLE cadeaux (
    id INT AUTO_INCREMENT PRIMARY KEY,
    listeId INT,
    nom VARCHAR(255) NOT NULL,
    description TEXT,
    prix DECIMAL(10, 2),
    prixOriginal DECIMAL(10, 2),
    reserve BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (listeId) REFERENCES listes(id)
);

INSERT INTO listes (nom, description, dateFin, enCours) VALUES 
('Anniversaire Maxime', 'Liste de cadeaux pour l''anniversaire de Maxime', '2024-05-15', TRUE);

INSERT INTO cadeaux (listeId, nom, description, prix, prixOriginal, reserve) VALUES 
(1, 'Livre de cuisine', '100 recettes de desserts', 25.99, 25.99, FALSE);
