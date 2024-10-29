const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcryptjs'); // Añadir bcrypt
const session = require('express-session'); // Middleware de sesión

const setupDatabase = require('./server/ServerLogin/dbConnection.js');  // Ruta corregida

const app = express();
app.set('port', 3000);

// Configurar la base de datos
setupDatabase(app);

// Middleware para bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuración del middleware de sesiones
app.use(session({
    secret: 'clave_secreta',
    resave: false,
    saveUninitialized: true,
    cookie: {
        sameSite: 'lax',
        secure: false  // Cambiar a true si usas HTTPS en producción
    }
}));


// Servir archivos estáticos de todo los archivos (CSS, JS)
app.use(express.static(path.join(__dirname, '/cliente/autentificacion')));
app.use(express.static(path.join(__dirname, '/server/ServerLogin')));
app.use(express.static(path.join(__dirname, '/server/Principal')));
app.use('/App_cliente', express.static(path.join(__dirname, 'cliente/App_cliente')));
app.use('/server/App_cliente', express.static(path.join(__dirname, 'server/App_cliente')));
app.use(express.static(path.join(__dirname, '/cliente')));
app.use(express.static(path.join(__dirname, 'cliente')));
app.use(express.static(path.join(__dirname, 'imagenes'))); // Sirviendo imágenes
app.use(express.static(path.join(__dirname, 'sfa-assets/images/svg'))); // Sirviendo SVGs

// Rutas para servir dinámicas '.html'
app.get('/Login', (req, res) => {
    res.sendFile(path.join(__dirname, '/cliente/autentificacion/login.html'));
});
app.get('/Localstoras.js', (req, res) => {
    res.type('application/javascript');
    res.sendFile(path.join(__dirname, 'cliente/App_cliente/Localstoras.js'));
});

app.get('/Registro', (req, res) => {
    res.sendFile(path.join(__dirname, '/cliente/autentificacion/signup.html'));
});

app.get('/Principal', (req, res) => {
    res.sendFile(path.join(__dirname, '/cliente/principal/Inicio.html'));
});

app.get('/AppCliente', (req, res) => {
    res.sendFile(path.join(__dirname, '/cliente/App_cliente/App_estudiante.html'));
});



// Ruta para recibir datos del formulario de registro
app.post('/registro', async (req, res) => {
    try {
        const { nombres, apellidos, fechaNacimiento, email, contraseña } = req.body;

        // Asegurarse de que el correo sea único antes de registrar al usuario
        req.getConnection((err, conn) => {
            if (err) {
                console.error('Error en la conexión a la base de datos:', err);
                return res.status(500).send({ success: false, message: 'Error en la conexión a la base de datos.' });
            }

            // Verificar si el correo ya existe
            const checkEmailQuery = 'SELECT * FROM registro WHERE email = ?';
            conn.query(checkEmailQuery, [email], (err, result) => {
                if (err) {
                    console.error('Error al verificar el correo en la base de datos:', err);
                    return res.status(500).send({ success: false, message: 'Error al verificar el correo en la base de datos.' });
                }

                if (result.length > 0) {
                    return res.status(400).send({ success: false, message: 'El correo ya está registrado.' });
                }

                // Encriptar la contraseña antes de guardar en la base de datos
                bcrypt.hash(contraseña, 10, (err, hashedPassword) => {
                    if (err) {
                        console.error('Error al encriptar la contraseña:', err);
                        return res.status(500).send({ success: false, message: 'Error al encriptar la contraseña.' });
                    }

                    // Insertar el nuevo usuario con la contraseña encriptada
                    const query = 'INSERT INTO registro (nombres, apellidos, fecha_nacimiento, email, contraseña) VALUES (?, ?, ?, ?, ?)';
                    conn.query(query, [nombres, apellidos, fechaNacimiento, email, hashedPassword], (err, result) => {
                        if (err) {
                            console.error('Error al guardar en la base de datos:', err);
                            return res.status(500).send({ success: false, message: 'Error al guardar en la base de datos.' });
                        }

                        console.log("Registro exitoso en la base de datos", result);
                        res.send({ success: true });
                    });
                });
            });
        });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).send({ success: false, message: 'Error al registrar el usuario.' });
    }
});

//Login de usuario
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ success: false, message: 'Correo o contraseña no recibidos.' });
    }

    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error en la conexión a la base de datos:', err);
            return res.status(500).send({ success: false, message: 'Error en la conexión a la base de datos.' });
        }

        const query = 'SELECT * FROM registro WHERE email = ?';
        conn.query(query, [email], async (err, results) => {
            if (err) {
                console.error('Error al consultar la base de datos:', err);
                return res.status(500).send({ success: false, message: 'Error al consultar la base de datos.' });
            }

            if (results.length === 0) {
                return res.status(400).send({ success: false, message: 'Usuario no encontrado.' });
            }

            const user = results[0];
            const validPassword = await bcrypt.compare(password, user.contraseña);

            if (validPassword) {
                if (req.session) {
                    req.session.userId = user.id;
                    req.session.userName = user.nombres;

                    // En lugar de enviar el JSON, redirige directamente desde el servidor
                    res.redirect('/AppCliente');
                } else {
                    return res.status(500).send({ success: false, message: 'Sesión no disponible.' });
                }
            } else {
                return res.status(400).send({ success: false, message: 'Contraseña incorrecta.' });
            }
        });
    });
});

// Iniciar el servidor
app.listen(app.get('port'), () => {
    console.log(`Server on port`, app.get('port'));
});
