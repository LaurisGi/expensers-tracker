const cors = require('cors');
const mysql2 = require('mysql2/promise');
const mysql = require('mysql2');
const express = require('express');
/// dotenv iskvietimui
require('dotenv').config();

console.log(process.env.MYSQ_HOST, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD  )

const app = express();

app.use(cors());
app.use(express.json());


const mysqlConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT
};

const connection = mysql.createConnection(mysqlConfig);

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

// app.get('/expenses', (req, res) => {
//   connection.execute('SELECT * FROM expenses', (err, expenses) => {
//     res.send(expenses);
//   });
// });

// 7 uzduotis Martyno sprendimas grazinti islaidas pagal id

// app.get('/expenses/:id', (req, res) => {
//   const id = req.params.id;
//   connection.execute('SELECT * FROM expenses WHERE userId = ?', [id], (err, expenses) => {
//     res.json(expenses);
//   });
// });

// sprendimas su query postman: expenses?userId=1

app.get('/expenses', (req, res) => {
  const { userId } = req.query;
  connection.execute('SELECT * FROM expenses WHERE userId=?', [userId], (err, expenses) => {
      res.send(expenses);
  });
});

app.post('/expenses', (req, res) => {
  const {type, amount, userId} = req.body;
  connection.query('INSERT INTO expenses (type, amount, userid) VALUES (?, ?, ?)', [type, amount, userId], (error, results) => {
    console.log(`User with userid:${userId} added type: ${type} to expenses list`);
  });
    connection.query('SELECT * FROM expenses WHERE userId=?', [userId], (error, results) => {
      if (error) throw error;
      res.json(results);
    });
})

app.listen(8080, () => {
    console.log('Server listening on port 8080');
  });
  