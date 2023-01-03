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
  database: 'expenses_tracker',
  port: 3306
});

// 6 uzduotis mano sprendimas
// app.get('/expenses', (req, res) => {
//   const sql = 'SELECT * FROM expenses';


//   connection.query(sql, (error, results) => {
//     if (error) {
//       console.error(error);
//       res.sendStatus(500);
//       return;
//     }

//     res.json(results);
//   });
// });

// 6 uzduotis Martyno sprendimas 

app.get('/expenses', (req, res) => {
  connection.execute('SELECT * FROM expenses', (err, expenses) => {
    res.send(expenses);
  });
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });
  