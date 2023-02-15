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

INSERT INTO female_characters (first_name, last_name, description, novel_id)
VALUES
  ('Elizabeth', 'Bennett', 'Witty, lovely female protagonist of P & P', 2),
  ('Anne', 'Elliot', 'Probably my favorite female JA character' ,6),
  ('Elinor', 'Dashwood', 'Sense',1),
  ('Marianne', 'Dashwood', 'Sensibility',1),
  ('Fanny', 'Price', 'Quiet and kind', 3),
  ('Emma', 'Woodhouse', 'Rich and beautiful busybody', 4);

INSERT INTO male_characters (first_name, last_name, description, novel_id)
VALUES
  ('Fitzwilliam', 'Darcy', 'Tall, handsome, rich male protagonist of P & P', 2),
  ('Frederick', 'Wentworth', 'The naval hottie brother of the renters of Kellynch', 6),
  ('Edward', 'Ferras', 'Loves him some Sense', 1),
  ('Christopher', 'Brandon', 'Loves him some Sensibility', 1),
  ('Edward', 'Bertram', 'Meh', 3),
  ('George', 'Knightley', 'Trusty neighbor', 4);
