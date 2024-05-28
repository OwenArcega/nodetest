const express = require("express");
const app = express();
const port = 3000;

const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "sql5.freemysqlhosting.net",
  user: "sql5709784",
  password: "IRmREkCdxe",
  database: "sql5709784",
});

connection.connect();

connection.query("SELECT 1 + 1 AS solution", (err, rows, fields) => {
  if (err) throw err;

  console.log("The solution is: ", rows[0].solution);
});

connection.end();

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.post("/image", (req, res) => {
  res.send(req.query.hola);
});

app.listen(port, () => {
  console.log(`Example listening on port ${port}`);
});
