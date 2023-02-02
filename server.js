const express = require('express');
const mysql = require('mysql2');
const inputCheck = require('./utils/inputCheck');

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
app.get('/api/novels', (req, res) => {
  const sql = `SELECT * FROM novels`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Success',
      data: rows
    });
  });
});

// Get a single novel
app.get('/api/novel/:id', (req, res) => {
  const sql = `SELECT * FROM novels WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Success',
      data: row
    });
  });
});

// Get all characters
app.get('/api/characters', (req, res) => {
  const sql = `SELECT characters.*, novels.title 
                   AS novel_title
                 FROM characters
            LEFT JOIN novels 
                   ON characters.novel_id = novels.id`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ 
      message: 'Success',
      data: rows
    });
  });
});

// Get all characters from a specific novel by novel_id
app.get('/api/characters/:novelid', (req, res) => {
  const sql = `SELECT characters.*, novels.title 
                   AS novel_title
                 FROM characters
            LEFT JOIN novels 
                   ON characters.novel_id = novels.id 
                WHERE novel_id = ?`;
  const params = [req.params.novelid];

  db.query(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Success',
      data: rows
    });
  });
});

// Delete a novel
app.delete('/api/novel/:id', (req, res) => {
  const sql = `DELETE FROM novels WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({ message: 'Novel not found' });
    } else {
      res.json({
        message: 'Deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

// Add a novel
app.post('/api/novel', ({ body }, res) => {
  const errors = inputCheck(body, 'title', 'year', 'complete');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  const sql = `INSERT INTO novels (title, year, complete)
              VALUES (?,?,?)`;
  const params = [body.title, body.year, body.complete];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Success',
      data: body
    });
  });
});

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});