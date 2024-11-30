const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

app.use(express.json());

// Question 1 goes here
app.get('/patients', (req, res) => {
    const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error retrieving patients:', err);
        res.status(500).send('Internal server error');
      } else {
        res.json(results);
      }
    });
  });
  

// Question 2 goes here
app.get('/providers', (req, res) => {
    const query = 'SELECT first_name, last_name, provider_specialty FROM providers';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error retrieving providers:', err);
        res.status(500).send('Internal server error');
      } else {
        res.json(results);
      }
    });
  });
  

// Question 3 goes here
app.get('/patients/:firstName', (req, res) => {
    const { firstName } = req.params;
    const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';
    db.query(query, [firstName], (err, results) => {
      if (err) {
        console.error('Error retrieving patients:', err);
        res.status(500).send('Internal server error');
      } else {
        res.json(results);
      }
    });
  });
  

// Question 4 goes here
app.get('/providers/specialty/:specialty', (req, res) => {
    const { specialty } = req.params;
    const query = 'SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?';
    db.query(query, [specialty], (err, results) => {
      if (err) {
        console.error('Error retrieving providers:', err);
        res.status(500).send('Internal server error');
      } else {
        res.json(results);
      }
    });
  });
  

// listen to the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
