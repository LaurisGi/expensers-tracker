const cors = require('cors');
const mysql2 = require('mysql2/promise');
const mysql = require('mysql2');

const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());


const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'tomas1234',
  database: 'shop',
  port: 3306
});


app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });
  