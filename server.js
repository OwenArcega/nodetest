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

const publicarImagen = (data) => {
  const key = "6d207e02198a847aa98d0a2a901485a5";
  const format = "json";

  fetch(
    `https://freeimage.host/api/1/upload/?key=${key}&source=${data}&format=${format}`,
    {
      method: "POST",
    }
  )
    .then((res) => JSON.parse(res))
    .then((data) => {
      if (data.success.code == "200") {
        data.image.display_url;
      } else {
        return "";
      }
    });
};

app.post("/publicarImagen", (req, res) => {
  const url = publicarImagen(req.body.imagen);
  if (!!url) {
    res.send(
      JSON.stringify({
        status: "ok",
      })
    );
  } else {
    res.send(
      JSON.stringify({
        status: "error",
        error: "URL de imagen no creada",
      })
    );
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
        res.send(
          JSON.stringify({
            status: "error",
            error: error,
          })
        );
      } else {
        res.send(
          JSON.stringify({
            status: "ok",
          })
        );
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Example listening on port ${port}`);
});
