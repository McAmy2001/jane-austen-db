const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// Get all characters
router.get('/characters', (req, res) => {
  const sql = `SELECT c.*, novels.title 
                   AS novel_title
                 FROM characters c
            LEFT JOIN novels 
                   ON c.novel_id = novels.id`;
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

// Get a single character by ID
router.get('/character/:id', (req, res) => {
  const sql = `SELECT * FROM characters WHERE id = ?`;
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

// Get all characters from a specific novel by novel_id
router.get('/characters-from-novel/:novelid', (req, res) => {
  const sql =  `SELECT first_name, last_name, n.title 
                  FROM characters c 
             LEFT JOIN novels n 
                    ON c.novel_id = n.id
                 WHERE novel_id = ?`             
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

//Update a character's description
router.put('/character/:id', (req, res) => {
  const sql = `UPDATE characters SET description = ?
                WHERE id = ?`;
  const params = [req.body.description, req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      // Check if a character is found with ID
    } else if (!result.affectedRows) {
      res.json({
        message: 'Character not found'
      });
    } else {
      res.json({
        message: 'Success',
        data: req.body,
        changes: result.affectedRows
      });
    }
  });
});

//Add a character
router.post('/character', ({ body }, res) => {
  const errors = inputCheck(body, 'first_name', 'last_name', 'description', 'novel_id');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  const sql = `INSERT INTO characters (first_name, last_name, description, novel_id)
              VALUES (?,?,?,?)`;
  const params = [body.first_name, body.last_name, body.description, body.novel_id];
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

//Delete a character
router.delete('/character/:id', (req, res) => {
  const sql = `DELETE FROM characters WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({ message: 'Character not found' });
    } else {
      res.json({
        message: 'Deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});


module.exports = router;