const express = require("express");
const mysql = require("mysql2");

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'db', // Nome do serviço no Docker
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'root',
  database: process.env.MYSQL_DATABASE || 'nodedb',
  port: 3306,  // A porta interna do MySQL é sempre 3306
});

db.connect((err) => {
  if (err) throw err;
  console.log("Conectado ao MySQL!");
  db.query("CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))");
});

app.get("/", (req, res) => {
  const name = `User_${Math.floor(Math.random() * 1000)}`;
  db.query(`INSERT INTO people(name) VALUES(?)`, [name]);

  db.query("SELECT * FROM people", (err, results) => {
    if (err) throw err;

    let namesList = results.map((row) => `<li>${row.name}</li>`).join("");
    res.send(`<h1>Full Cycle Rocks!</h1><ul>${namesList}</ul>`);
  });
});

app.listen(port, () => console.log(`App rodando na porta ${port}`));
