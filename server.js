const express = require("express");
const app = express();
const cors = require('cors');

const port = 3000;

const mysql = require("mysql");
const pool = mysql.createPool({
  connectionLimit: 100, // Número máximo de conexiones en el pool
  host: "sql5.freemysqlhosting.net",
  user: "sql5709784",
  password: "IRmREkCdxe",
  database: "sql5709784"
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.post("/publicarImagen", (req, res) => {
    res.json({
        status:"ok"
    })
//   const key = "6aafdbc3bdbc74f2192d1d3bb68aeb9f";
//     const source = req.body.imagen;
    
//   fetch("https://api.imgbb.com/1/upload", {
//     method: "POST",
//     body: JSON.stringify({
//       key: key,
//       image: source,
//     }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//       if (data.success) {
//         res.send(data.data.url);
//       } else {
//         res.send("No se creo la imagen");
//       }
//     })
//     .catch((error) => console.error("Error: " + error));
});

/////////////////////////////////////////////Mascotas perdidas//////////////////////////////////////////

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
    id_usuario
  } = req.body;

  pool.query(
    `INSERT INTO mascotas_perdidas(nombre,especie,raza,color,edad,sexo,ubicacion,nombreContacto,telefonoContacto,correoContacto,imagen,descripcion, id_usuario) 
    VALUES('${nombre}','${especie}','${raza}','${color}',${edad},'${sexo}','${ubicacion}','${nombreContacto}','${telefonoContacto}','${correoContacto}','${imagen}','${descripcion}', ${id_usuario})`,
    (error, rows, fields) => {
      if (error) {
        res.json({
          status: "error",
          error: error,
        });
      } else {
        res.json({
          status: "ok",
        });
      }
    }
    );
});

app.get("/obtenerPerdidas", (req, res) => {
    pool.query("SELECT * FROM mascotas_perdidas", (error, rows, fields) => {
    if (error) {
      res.json({
        status: "error",
        error: error,
      });
    } else {
      res.json({
        status: "ok",
        body: rows,
      });
    }
  });
});

app.post('/obtenerMascotaPerdida', (req, res) => {
    const id = req.body.id;

    pool.query(`SELECT * FROM mascotas_perdidas WHERE id = ${id}`, (error, rows, fields) => {
        if (error) {
            res.json({
                status: "error",
                error: error
            })
        } else {
            res.json({
                status: "ok",
                body: rows
            })
        }
    })
})

app.post("/obtenerPerdidasUsuario", (req, res) => {
  const id = req.body.id;

  pool.query(
    `SELECT * FROM mascotas_perdidas WHERE id_usuario = ${id}`,
    (error, rows, fields) => {
      if (error) {
        res.json({
          status: "error",
          error: error,
        });
      } else {
        res.json({
          status: "ok",
          body: rows,
        });
      }
    }
  );
});

app.delete('/eliminarPerdida', (req, res) => {
    const id = req.body.id;
    pool.query(`DELETE FROM mascotas_perdidas WHERE id = ${id}`, (error, rows, fields) => {
        if (error) {
            res.json({
                status: "error",
                error: error
            })
        } else {
            res.json({
                status: "ok",
                body: rows
            })
        }
    })
})

app.patch('/modificarPerdida', (req, res) => {
    const {
        id,
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
      id_usuario,
    } = req.body;

    pool.query(
        `UPDATE mascotas_perdidas SET nombre = '${nombre}', especie = '${especie}', 
      raza = '${raza}', color = '${color}', edad = ${edad}, sexo = '${sexo}', ubicacion = '${ubicacion}',
      nombreContacto = '${nombreContacto}', telefonoContacto = '${telefonoContacto}', correoContacto = '${correoContacto}',
      imagen = '${imagen}', descripcion = '${descripcion}', id_usuario = ${id_usuario} WHERE id = ${id}`,
      (error, rows, fields) => {
        if (error) {
          res.json({
            status: "error",
            error: error,
          });
        } else {
          res.json({
            status: "ok",
          });
        }
      }
    );
})

/////////////////////////////////////////////Mascotas en adopcion//////////////////////////////////////////

app.post("/registrarAdopcion", (req, res) => {
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
    id_usuario
  } = req.body;

  pool.query(
    `INSERT INTO mascotas_adopcion(nombre,especie,raza,color,edad,sexo,ubicacion,nombreContacto,telefonoContacto,correoContacto,imagen,descripcion, id_usuario) 
    VALUES('${nombre}','${especie}','${raza}','${color}',${edad},'${sexo}','${ubicacion}','${nombreContacto}','${telefonoContacto}','${correoContacto}','${imagen}','${descripcion}', ${id_usuario})`,
    (error, rows, fields) => {
      if (error) {
        res.json({
          status: "error",
          error: error,
        });
      } else {
        res.json({
          status: "ok",
        });
      }
    }
  );
});

app.get('/obtenerAdopcion', (req, res) => {
    pool.query("SELECT * FROM mascotas_adopcion", (error, rows, fields) => {
      if (error) {
        res.json({
          status: "error",
          error: error,
        });
      } else {
        res.json({
          status: "ok",
          body: rows,
        });
      }
    });
})

app.post("/obtenerMascotaAdopcion", (req, res) => {
  const id = req.body.id;

  pool.query(
    `SELECT * FROM mascotas_adopcion WHERE id = ${id}`,
    (error, rows, fields) => {
      if (error) {
        res.json({
          status: "error",
          error: error,
        });
      } else {
        res.json({
          status: "ok",
          body: rows,
        });
      }
    }
  );
});

app.post("/obtenerAdopcionUsuario", (req, res) => {
  const id = req.body.id;

  pool.query(
    `SELECT * FROM mascotas_perdidas WHERE id_usuario = ${id}`,
    (error, rows, fields) => {
      if (error) {
        res.json({
          status: "error",
          error: error,
        });
      } else {
        res.json({
          status: "ok",
          body: rows,
        });
      }
    }
  );
});

app.delete("/eliminarAdopcion", (req, res) => {
  const id = req.body.id;
  pool.query(
    `DELETE FROM mascotas_adopcion WHERE id = ${id}`,
    (error, rows, fields) => {
      if (error) {
        res.json({
          status: "error",
          error: error,
        });
      } else {
        res.json({
          status: "ok",
          body: rows,
        });
      }
    }
  );
});

app.patch("/modificarAdopcion", (req, res) => {
    const {
      id,
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
    id_usuario,
  } = req.body;

  pool.query(
    `UPDATE mascotas_adopcion SET nombre = '${nombre}', especie = '${especie}', 
      raza = '${raza}', color = '${color}', edad = ${edad}, sexo = '${sexo}', ubicacion = '${ubicacion}',
      nombreContacto = '${nombreContacto}', telefonoContacto = '${telefonoContacto}', correoContacto = '${correoContacto}',
      imagen = '${imagen}', descripcion = '${descripcion}', id_usuario = ${id_usuario}) WHERE id = ${id}`,
    (error, rows, fields) => {
      if (error) {
        res.json({
          status: "error",
          error: error,
        });
      } else {
        res.json({
          status: "ok",
        });
      }
    }
  );
});

//////////////////////////////////USUARIOS///////////////////////////////////////////////

app.post("/registrarUsuario", (req, res) => {
  const {
    usuario,
    correo,
    contrasena
  } = req.body;

  pool.query(
    `INSERT INTO usuarios(usuario,correo,contrasena) 
    VALUES('${usuario}','${correo}','${contrasena}')`,
    (error, rows, fields) => {
      if (error) {
        res.json({
          status: "error",
          error: error,
        });
      } else {
        res.json({
          status: "ok",
        });
      }
    }
  );
});


app.get('/obtenerUsuarios', (req,res) => {
    pool.query("SELECT * FROM usuarios", (error, rows, fields) => {
        if (error) {
            res.json({
                status: "error",
                error: error
            })
        } else {
            res.json({
                status: "ok",
                body: rows
            });
        }
    });
})

app.post('/login', (req, res) => {

    const { nombre, contrasena } = req.body;

    console.log("usuario: " + nombre);
    console.log("contrasena" + contrasena);
    pool.query(`SELECT id FROM usuarios WHERE usuario = '${nombre}' AND contrasena = '${contrasena}'`,
        (error, rows, fields) => {
            if (error) {
                res.json({
                    status: "error",
                    error: error
                })
            } else {
                res.json({
                    status: "ok",
                    body: rows
                })
            }
        })
})


app.listen(port, () => {
  console.log(`Example listening on port ${port}`);
});
