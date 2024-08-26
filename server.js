const express = require("express");
const app = express();
const cors = require('cors');

const port = 3000;

const mysql = require("mysql2");
const pool = mysql.createPool({
  connectionLimit: 100,
  host: "mysql-c75ed23-ucol-8f58.k.aivencloud.com",
  user: "avnadmin",
  password: "AVNS_WRoYmbd4GIyVZEMfxDg",
  database: "defaultdb",
  port: 11456,
});

app.use(cors({origin:"*"}));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

app.get("/", (req, res) => {
  res.send("Hello world!");
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

  const imageFormData = new FormData();
  imageFormData.append("key", "6aafdbc3bdbc74f2192d1d3bb68aeb9f");
  imageFormData.append("image", imagen);

  const imageRequestOptions = {
    method: "POST",
    body: imageFormData,
  };

  fetch("https://api.imgbb.com/1/upload", imageRequestOptions)
    .then((response) => response.json())
    .then((result) => {
      let url = result.data.url;
      pool.query(
        `INSERT INTO mascotas_perdidas(nombre,especie,raza,color,edad,sexo,ubicacion,nombreContacto,telefonoContacto,correoContacto,imagen,descripcion, id_usuario)
        VALUES('${nombre}','${especie}','${raza}','${color}',${edad},'${sexo}','${ubicacion}','${nombreContacto}','${telefonoContacto}','${correoContacto}','${url}','${descripcion}', ${id_usuario})`,
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
        });
      });
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

  const imageFormData = new FormData();
  imageFormData.append("key", "6aafdbc3bdbc74f2192d1d3bb68aeb9f");
  imageFormData.append("image", imagen);

  const imageRequestOptions = {
    method: "POST",
    body: imageFormData,
  };
  
  fetch("https://api.imgbb.com/1/upload", imageRequestOptions)
    .then((response) => response.json())
    .then((result) => {
      let url = result.data.url;
      pool.query(
        `INSERT INTO mascotas_adopcion(nombre,especie,raza,color,edad,sexo,ubicacion,nombreContacto,telefonoContacto,correoContacto,imagen,descripcion, id_usuario) 
    VALUES('${nombre}','${especie}','${raza}','${color}',${edad},'${sexo}','${ubicacion}','${nombreContacto}','${telefonoContacto}','${correoContacto}','${url}','${descripcion}', ${id_usuario})`,
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
    `SELECT * FROM mascotas_adopcion WHERE id_usuario = ${id}`,
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

    const imageFormData = new FormData();
    imageFormData.append("key", "6aafdbc3bdbc74f2192d1d3bb68aeb9f");
    imageFormData.append("image", imagen);

    const imageRequestOptions = {
      method: "POST",
      body: imageFormData,
    };

  fetch("https://api.imgbb.com/1/upload", imageRequestOptions)
    .then((response) => response.json())
    .then((result) => {
      let url = result.data.url;
  
      pool.query(
        `UPDATE mascotas_adopcion SET nombre = '${nombre}', especie = '${especie}', 
      raza = '${raza}', color = '${color}', edad = ${edad}, sexo = '${sexo}', ubicacion = '${ubicacion}',
      nombreContacto = '${nombreContacto}', telefonoContacto = '${telefonoContacto}', correoContacto = '${correoContacto}',
      imagen = '${url}', descripcion = '${descripcion}', id_usuario = ${id_usuario} WHERE id = ${id}`,
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

app.post("/mascotaIdeal", (req, res) => {
  const { answers } = req.body;
  const estado = answers.shift();
  const preferencias = answers;
   pool.query(`SELECT * FROM mascotas_adopcion WHERE ubicacion LIKE '%${estado}%'`,
     (error, rows, fields) => {
            if (error) {
                res.json({
                    status: "error",
                    error: error
                })
            } else {
              let mascotas = rows;
              process.env.API_KEY = "AIzaSyABQaARp_m_mF3UA3EOQXqKYCBZG1dkFGc";
              const { GoogleGenerativeAI } = require("@google/generative-ai");
              const genAI = new GoogleGenerativeAI(process.env.API_KEY);
              const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
              console.log(mascotas);
            
            async function run() {
              // let prompt = `De acuerdo a las siguientes mascotas: ${mascotas} encuentra a la ideal para el usuario con las siguientes preferencias únicamente usando las mascotas dadas: ${preferencias}, regresame la mascota ideal en formato json, si no se encuentra una ideal, regresa la más cercana o la única disponible. Usa solamente la información que tengas según cada raza de animal, haz inferencias para encontrar la mascota ideal con la información dada y nada más, creale caractersíticas necesarias para que puedas hacer la evaluación con las mascotas dadas.`;
            
              // let result = await model.generateContent(prompt);
              // let response = await result.response;
              // let text = response.text();

              let prompt = `Que contiene este json?: ${mascotas}`;
              let result = await model.generateContent(prompt);
              let response = await result.response;
              let text = response.text();

              console.log(text)
            }
            run();
            }
        })


})

app.listen(port, () => {
  console.log(`Example listening on port ${port}`);
});
