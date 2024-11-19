const express = require("express");
const app = express();
const cors = require("cors");

const port = 3000;

process.env.API_KEY = "AIzaSyABQaARp_m_mF3UA3EOQXqKYCBZG1dkFGc";
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const mysql = require("mysql2");
const { error } = require("console");
const pool = mysql.createPool({
  connectionLimit: 100,
  host: "mysql-c75ed23-ucol-8f58.k.aivencloud.com",
  user: "avnadmin",
  password: "AVNS_WRoYmbd4GIyVZEMfxDg",
  database: "defaultdb",
  port: 11456,
});

app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

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
    id_usuario,
  } = req.body;

  const imageFormData = new FormData();
  imageFormData.append("key", "6dd3db0cfb2ff944d101f83d3545e850");
  imageFormData.append("image", imagen);

  const imageRequestOptions = {
    method: "POST",
    body: imageFormData,
  };

  fetch("https://api.imgbb.com/1/upload", imageRequestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.data != "success") {
        res.json({
          status: "Error",
          error: result,
        });
      } else {
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
          }
        );
      }
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

app.post("/obtenerMascotaPerdida", (req, res) => {
  const id = req.body.id;
  pool.query(`SELECT * FROM mascotas_perdidas WHERE id = ${id}`, (error, rows, fields) => {
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

app.post("/obtenerPerdidasUsuario", (req, res) => {
  const id = req.body.id;
  pool.query(`SELECT * FROM mascotas_perdidas WHERE id_usuario = ${id}`, (error, rows, fields) => {
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

app.delete("/eliminarPerdida", (req, res) => {
  const id = req.body.id;
  pool.query(`DELETE FROM mascotas_perdidas WHERE id = ${id}`, (error, rows, fields) => {
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

app.patch("/modificarPerdida", (req, res) => {
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
  imageFormData.append("key", "6dd3db0cfb2ff944d101f83d3545e850");
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
        `UPDATE mascotas_perdidas SET nombre = '${nombre}', especie = '${especie}', 
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
    id_usuario,
  } = req.body;

  const imageFormData = new FormData();
  imageFormData.append("key", "6dd3db0cfb2ff944d101f83d3545e850");
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

app.get("/obtenerAdopcion", (req, res) => {
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
});

app.post("/obtenerMascotaAdopcion", (req, res) => {
  const id = req.body.id;

  pool.query(`SELECT * FROM mascotas_adopcion WHERE id = ${id}`, (error, rows, fields) => {
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

app.post("/obtenerAdopcionUsuario", (req, res) => {
  const id = req.body.id;

  pool.query(`SELECT * FROM mascotas_adopcion WHERE id_usuario = ${id}`, (error, rows, fields) => {
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

app.delete("/eliminarAdopcion", (req, res) => {
  const id = req.body.id;
  pool.query(`DELETE FROM mascotas_adopcion WHERE id = ${id}`, (error, rows, fields) => {
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
  imageFormData.append("key", "6dd3db0cfb2ff944d101f83d3545e850");
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
  const { usuario, correo, contrasena } = req.body;

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

app.get("/obtenerUsuarios", (req, res) => {
  pool.query("SELECT * FROM usuarios", (error, rows, fields) => {
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

app.post("/login", (req, res) => {
  const { nombre, contrasena } = req.body;
  pool.query(
    `SELECT id FROM usuarios WHERE usuario = '${nombre}' AND contrasena = '${contrasena}'`,
    (error, rows, fields) => {
      if (error) {
        res.json({
          status: "error",
          error: error,
        });
      } else {
        if (rows.length == 0) {
          res.json({
            status: "error",
            error: "No se ha encontrado el usuario",
          });
        }
        res.json({
          status: "ok",
          body: rows,
        });
      }
    }
  );
});

function fileToGenerativePart(imageData, mimeType) {
  return {
    inlineData: {
      data: imageData,
      mimeType,
    },
  };
}

app.post("/obtenerInfo", (req, res) => {
  const { imagen } = req.body; // Se espera que la imagen se envíe en el cuerpo de la solicitud

  let prompt =
    "dame los siguientes datos si los encuentras en el póster: nombre, especie, raza, color, edad, sexo, localización o dirección en donde se perdió, nombre del contacto del dueño, teléfono y correo electrónico; si puedes obtener la información con solo ver la imagen de la mascota regresa lo que encuentres correspondiente a color, raza y especie. Ten en cuenta los sinonimos de estas. Si no encuentras todos los datos, pásame los que encuentres. Dame la respuesta en JSON con los siguientes campos: nombre, especie, raza, color, edad, sexo, localización, nombre_del_contacto_del_dueño, teléfono y correo_electrónico.";

  const imagePart = fileToGenerativePart(imagen, "image/jpeg");

  model
    .generateContent([prompt, imagePart])
    .then((response) => {
      let result = response.response.text();

      // Limpiar posibles caracteres inesperados
      result = result.trim();
      if (result.startsWith("```json")) {
        result = result
          .replace(/^```json/, "")
          .replace(/```$/, "")
          .trim();
      }

      let dataObj;
      try {
        dataObj = JSON.parse(result);
        res.json(dataObj); // Responde con los datos identificados
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError, result);
        res.status(500).send("Error parsing the response from AI.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).send("Error processing the image.");
    });
});

app.post("/mascotaIdeal", (req, res) => {
  const { answers } = req.body;
  const estado = answers.shift();
  const preferencias = answers;

  // Realizar la consulta a la base de datos
  pool.query(
    `SELECT * FROM mascotas_adopcion WHERE ubicacion LIKE ?`,
    [`%${estado}%`],
    (error, rows) => {
      if (error) {
        return res.json({
          status: "error",
          error: error.message,
        });
      }

      if (rows.length === 0) {
        return res.json({
          status: "error",
          error: "No se encontraron mascotas en la ubicación especificada.",
        });
      }

      // Mapear las mascotas
      let mascotas = rows.map((mascota) => {
        return {
          id: mascota.id,
          nombre: mascota.nombre,
          raza: mascota.raza,
          // Aquí se agregarían las propiedades adicionales generadas por el modelo
        };
      });

      // Generar el prompt para el modelo
      const prompt = `Dadas las siguientes mascotas en formato JSON: ${JSON.stringify(mascotas)}, 
genera un nuevo objeto JSON donde cada mascota tenga las siguientes propiedades adicionales:
* **tiempoEjercicioDiario:** Número de horas de ejercicio recomendado.
* **nivelEnergia:** Valor numérico del 1 al 5, siendo 5 el más energético.
* **tamano:** Pequeño, mediano o grande.
* **personalidad:** Descripción breve de su personalidad (e.g., juguetón, independiente).
* **produceAlergias:** Verdadero o falso.
* **familiasAdecuadas:** Lista de tipos de familia (e.g., con niños, sin niños, con otras mascotas).

Asegúrate de que las propiedades adicionales se asignen de acuerdo a la raza de cada mascota. Usa únicamente las mascotas: ${JSON.stringify(
        mascotas
      )}, no crees nuevas mascotas, únicamente las que te proporciono.`;

      // Llamar al modelo para generar contenido
      model
        .generateContent(prompt)
        .then((result) => {
          const response = result.response;
          const text = response.text();

          // Extraer solo el objeto JSON de la respuesta
          const jsonStartIndex = text.indexOf("{");
          const jsonEndIndex = text.lastIndexOf("}") + 1;
          const jsonString = text.slice(jsonStartIndex, jsonEndIndex);

          let mascotasConCaracteristicas;
          try {
            mascotasConCaracteristicas = JSON.parse("[" + jsonString + "]");
          } catch (parseError) {
            return res.json({
              status: "error",
              error: "La respuesta del modelo no es un JSON válido.",
              details: parseError.message,
            });
          }

          // Generar el prompt para encontrar la mascota ideal
          const promptMascotaIdeal = `Dadas las siguientes mascotas con sus características: ${JSON.stringify(
            mascotasConCaracteristicas
          )} y las siguientes preferencias del usuario: ${JSON.stringify(preferencias)}, 
selecciona la mascota ideal y devuelve solo el objeto JSON con la mascota seleccionada.`;

          // Llamar al modelo para encontrar la mascota ideal
          return model.generateContent(promptMascotaIdeal);
        })
        .then((resultIdeal) => {
          const responseIdeal = resultIdeal.response;
          const textIdeal = responseIdeal.text();

          // Extraer solo el objeto JSON de la respuesta
          const jsonStartIndex = textIdeal.indexOf("{");
          const jsonEndIndex = textIdeal.lastIndexOf("}") + 1;
          const jsonString = textIdeal.slice(jsonStartIndex, jsonEndIndex);

          let mascotaIdeal;
          try {
            mascotaIdeal = JSON.parse("[" + jsonString + "]");
          } catch (parseError) {
            return res.json({
              status: "error",
              error: "La respuesta del modelo para la mascota ideal no es un JSON válido.",
              details: parseError.message,
            });
          }

          pool.query(
            `SELECT * FROM mascotas_adopcion WHERE id = ${mascotaIdeal[0].id}`,
            (error, rows) => {
              if (error) {
                res.json({
                  status: "error",
                  error: "Error al obtener la mascota ideal.",
                  details: error,
                });
              } else {
                res.json({
                  status: "success",
                  data: rows,
                });
              }
            }
          );
        })
        .catch((err) => {
          res.json({
            status: "error",
            error: err.message,
          });
        });
    }
  );
});

app.listen(port, () => {
  console.log(`Example listening on port ${port}`);
});
