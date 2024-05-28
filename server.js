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

async function publicarImagen(data) {
  const key = "6d207e02198a847aa98d0a2a901485a5";
  const format = "json";

  fetch(
    `https://freeimage.host/api/1/upload/?key=${key}&source=${data}&format=${format}`,
    {
      method: "POST",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.success.code == "200") {
        return data.image.display_url;
      } else {
        return "";
      }
    })
    .catch((error) => console.error("Error: " + error));
}

app.post("/publicarImagen", async (req, res) => {
  const url = await publicarImagen(req.body.imagen);
  if (url) {
    res.send("ok");
  } else {
    res.send("Imagen no creada");
  }
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
