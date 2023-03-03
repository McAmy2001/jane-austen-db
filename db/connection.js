const mysql = require('mysql2');

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'WeRealCool2022!',
    database: 'janeausten'
  },
  console.log('Connected to the janeausten database.')
);

module.exports = db;