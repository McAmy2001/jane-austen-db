DROP TABLE IF EXISTS male_characters;
DROP TABLE IF EXISTS female_characters;
DROP TABLE IF EXISTS novels;

CREATE TABLE novels (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  year INTEGER NOT NULL,
  complete BOOLEAN NOT NULL
);

CREATE TABLE female_characters (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(15) NOT NULL,
  last_name VARCHAR(20) NOT NULL,
  description TEXT,
  novel_id INTEGER,
  CONSTRAINT fk_novel_f FOREIGN KEY (novel_id) REFERENCES novels(id) ON DELETE SET NULL
);

CREATE TABLE male_characters (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(15) NOT NULL,
  last_name VARCHAR(20) NOT NULL,
  description TEXT,
  novel_id INTEGER,
  CONSTRAINT fk_novel_m FOREIGN KEY (novel_id) REFERENCES novels(id) ON DELETE SET NULL
);