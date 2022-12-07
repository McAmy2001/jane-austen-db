const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

//Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'WeRealCool2022!',
    database: 'janeausten'
  },
  console.log('Connected to the janeausten database.')
);

// Get all novels
db.query(`SELECT * FROM novels`, (err, rows) => {
  console.log(rows);
});

// Get a single novel
//db.query(`SELECT * FROM novels WHERE id = 2`, (err, rows) => {
//  if (err) {
//    console.log(err);
//  }
//  console.log(rows);
//});

// Delete a novel
//db.query(`DELETE FROM novels WHERE id = ?`, 2, (err, result) => {
//  if (err) {
//    console.log(err);
//  }
//  console.log(result);
//});

// Add a novel
//const sql = `INSERT INTO novels (id, title, year, complete)
//              VALUES (?,?,?,?)`;
//const params = [2, 'Pride and Prejudice', 1813, 1]  ;
//db.query(sql, params, (err, result) => {
//  if (err) {
//    console.log(err);
//  }
//  console.log(result);
//});            

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});