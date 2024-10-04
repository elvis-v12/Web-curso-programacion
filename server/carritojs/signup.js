// server/signup.js
const express = require("express");
const bodyParser = require("body-parser");
const conexion = require("./conexion");

const app = express();
const port = 3306; // Puedes cambiar el puerto si lo deseas

// Middleware para parsear el cuerpo de la petición
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Ruta para manejar el registro
app.post("/register", (req, res) => {
    const { nombre, email, contrasena } = req.body;

    // Comprobar que los campos no estén vacíos
    if (!nombre || !email || !contrasena) {
        return res.status(400).send("Todos los campos son obligatorios");
    }

    // Consulta para insertar el nuevo usuario
    const sql = "INSERT INTO Usuario (nombre, email, contrasena) VALUES (?, ?, ?)";
    conexion.query(sql, [nombre, email, contrasena], (err, result) => {
        if (err) {
            return res.status(500).send("Error al registrar el usuario");
        }
        res.status(200).send("Usuario registrado con éxito");
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
