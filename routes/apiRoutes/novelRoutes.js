const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// Get all novels
router.get('/novels', (req, res) => {
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
router.get('/novel/:id', (req, res) => {
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

// Delete a novel
router.delete('/novel/:id', (req, res) => {
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
router.post('/novel', ({ body }, res) => {
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

module.exports = router;