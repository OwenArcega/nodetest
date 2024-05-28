import express, { json } from "express";
const app = express();
import fetch from "node-fetch";
import FormData from "form-data";

const port = 3000;

import { createConnection } from "mysql";
const connection = createConnection({
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

app.use(json());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.post("/publicarImagen", (req, res) => {
  const key = "6d207e02198a847aa98d0a2a901485a5";
  const format = "json";
    const source = req.body.imagen;
    
      const form = new FormData();
      form.append("key", key);
      form.append("action", "upload");
      form.append("source", source);
      form.append("format", format);
    
  fetch(
    `https://freeimage.host/api/1/upload`,
    {
        method: "POST",
        body: form,
        headers: form.getHeaders()
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status_code == "200") {
        res.send(data.imagen.display_url);
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
