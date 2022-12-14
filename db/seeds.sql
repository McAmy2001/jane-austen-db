INSERT INTO novels (title, year, complete)
VALUES 
  ('Sense and Sensibility', 1811, 1),
  ('Pride and Prejudice', 1813, 1),
  ('Mansfield Park', 1814, 1),
  ('Emma', 1815, 1),
  ('Northanger Abbey', 1818, 1),
  ('Persuasion', 1818, 1),
  ('Lady Susan', 1871, 1),
  ('The Watsons', 1804, 0),
  ('Sanditon', 1817, 0);

INSERT INTO characters (first_name, last_name, novel_id)
VALUES
  ('Elizabeth', 'Bennett', 2),
  ('Fitzwilliam', 'Darcy', 2),
  ('Anne', 'Elliot', 6),
  ('Frederick', 'Wentworth', 6),
  ('Elinor', 'Dashwood', 1),
  ('Marianne', 'Dashwood', 1),
  ('Edward', 'Ferras', 1),
  ('Christopher', 'Brandon', 1),
  ('Fanny', 'Price', 3),
  ('Edward', 'Bertram', 3),
  ('Emma', 'Woodhouse', 4),
  ('George', 'Knightley', 4);
