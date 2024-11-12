// dbConnection.js
const myconnection = require('express-myconnection');
const mysql = require('mysql');

const dbOptions = {
  host: 'localhost',       // Cambia esto por tu host de base de datos
  user: 'root',            // Usuario de tu base de datos
  password: '',            // Contraseña de tu base de datos (cámbiala si es necesario)
  database: 'webcursos',   // Nombre de la base de datos a la que deseas conectarte
  port: 3306               // Puerto MySQL (3306 es el puerto por defecto)
};

function setupDatabase(app) {
  app.use(myconnection(mysql, dbOptions, 'single'));
}

module.exports = setupDatabase;
