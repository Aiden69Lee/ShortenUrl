const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mysql = require('mysql');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || "8000";

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

connection.connect((err) => {
  if (err) {
    console.log('Cannot connect to database: ', err.message);
    return;
  }
  console.log('Connect to database');
});

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  req.db = connection;
  next();
});

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is starting at port ${port}.`);
});
