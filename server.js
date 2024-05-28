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

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.post("/publicarImagen", (req, res) => {
  const key = "6aafdbc3bdbc74f2192d1d3bb68aeb9f";
  const format = "json";
    const source = req.body.imagen;
    
  fetch("https://api.imgbb.com/1/upload", {
    method: "POST",
    body: JSON.stringify({
      key: key,
      image: source,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.success) {
        res.send(data.data.url);
      } else {
        res.send("No se creo la imagen");
      }
    })
    .catch((error) => console.error("Error: " + error));
});

app.post("/registrarPerdida", (req, res) => {
  const {
    nombre,
    especie,
    raza,
    color,
    edad,
    sexo,
    ubicacion,
    nombreContacto,
    telefonoContacto,
    correoContacto,
    imagen,
    descripcion,
  } = req.body;

  connection.query(
    `INSERT INTO mascotas_perdidas(nombre,especie,raza,color,edad,sexo,ubicacion,nombreContacto,telefonoContacto,correoContacto,imagen,descripcion) 
    VALUES(${nombre},${especie},${raza},${color},${edad},${sexo},${ubicacion},${nombreContacto},${telefonoContacto},${correoContacto},${imagen},${descripcion})`,
    (error, rows, fields) => {
      if (error) {
        res.send({
          status: "error",
          error: error,
        });
      } else {
        res.send({
          status: "ok",
        });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Example listening on port ${port}`);
});
