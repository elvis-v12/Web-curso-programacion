require('dotenv').config(); // Carga las variables de entorno del archivo .env

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const helmet = require('helmet');
const paymentRoutes = require('./server/ServerLogin/payment.routes.js'); // Rutas de pago
const setupDatabase = require('./server/ServerLogin/dbConnection.js'); // Configuración de la base de datos

const app = express();
app.set('port', 3000);

// Middleware para procesar JSON y formularios
app.use(express.json()); // Analiza JSON en el cuerpo de la solicitud
app.use(express.urlencoded({ extended: true })); // Permite procesar datos de formularios

app.use('/api/payments', paymentRoutes); // Registrar las rutas en /api/payments


// Configurar la base de datos
setupDatabase(app);
// Registrar rutas de pago
app.use('/api/payments', paymentRoutes); // Rutas para Stripe

// Configuración del middleware de sesiones
app.use(session({
    secret: 'clave_secreta',
    resave: false,
    saveUninitialized: true,
    cookie: {
        sameSite: 'lax',
        secure: false // Cambiar a true si usas HTTPS en producción
    }
}));
const cors = require('cors');
app.use(cors());


// Middleware de seguridad
// Middleware de seguridad
// Middleware de seguridad con ajustes de CSP
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            "default-src": ["'self'"], // Permitir recursos del mismo dominio
            "script-src": [
                "'self'",
                "'unsafe-inline'",
                "https://cdn.jsdelivr.net",
                "https://cdnjs.cloudflare.com",
                "https://unpkg.com",
                "https://code.jquery.com",
                "https://www.paypal.com",
                "https://js.stripe.com"
            ],
            "style-src": [
                "'self'",
                "'unsafe-inline'",
                "https://fonts.googleapis.com",
                "https://cdnjs.cloudflare.com",
                "https://unpkg.com",
                "https://cdn.jsdelivr.net"
            ],
            "font-src": [
                "'self'",
                "data:",
                "https://fonts.gstatic.com",
                "https://cdnjs.cloudflare.com",
                "https://unpkg.com",
                "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/fonts/",
                "https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/" // Fuentes de Remixicon
            ],
            "img-src": [
                "'self'",
                "data:",
                "https:",
                "https://images.unsplash.com"
            ],
            "frame-src": [
                "'self'",
                "https://js.stripe.com" // Permitir frames de Stripe
            ],
            "script-src-attr": ["'self'", "'unsafe-inline'"],
            "style-src-attr": ["'self'", "'unsafe-inline'"],
        },
    },
}));



// Servir archivos estáticos
app.use(express.static(path.join(__dirname, '/cliente/autentificacion')));
app.use(express.static(path.join(__dirname, '/server/ServerLogin')));
app.use(express.static(path.join(__dirname, '/server/Principal')));
app.use(express.static(path.join(__dirname, '/server/pago')));
app.use('/App_cliente', express.static(path.join(__dirname, 'cliente/App_cliente')));
app.use('/server/App_cliente', express.static(path.join(__dirname, 'server/App_cliente')));
app.use(express.static(path.join(__dirname, '/cliente')));
app.use(express.static(path.join(__dirname, '/cliente/App_cliente/imagenes'))); // Sirviendo imágenes
app.use(express.static(path.join(__dirname, 'sfa-assets/images/svg'))); // Sirviendo SVGs
app.use("/cliente", express.static(path.join(__dirname, "cliente")));
app.use(express.static(path.join(__dirname, '/server/ServerLogin')));
app.use('/server/ServerLogin', express.static(path.join(__dirname, 'server/ServerLogin')));


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
app.get('/server/ServerLogin/disableBack.js', (req, res) => {
    res.type('application/javascript'); // Especificar el tipo MIME correcto
    res.sendFile(path.join(__dirname, 'server/ServerLogin/disableBack.js'));
});
app.get('/server/ServerLogin/logout.js', (req, res) => {
    res.type('application/javascript');
    res.sendFile(path.join(__dirname, 'server/ServerLogin/logout.js'));
});
app.get('/Principal', (req, res) => {
    res.sendFile(path.join(__dirname, '/cliente/principal/Inicio.html'));
});
app.get('/AppCliente', (req, res) => {
    res.sendFile(path.join(__dirname, '/cliente/App_cliente/App_estudiante.html'));
});
app.get('/AppClienteNinos', (req, res) => {
    res.sendFile(path.join(__dirname, '/cliente/App_cliente/App_estudianteNinos.html'));
});
app.get('/server/ServerLogin/registro.js', (req, res) => {
    res.type('application/javascript');
    res.sendFile(path.join(__dirname, 'server/ServerLogin/registro.js'));
});
app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname, 'favicon.ico'));
});
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    next();
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

            const checkEmailQuery = 'SELECT * FROM registro WHERE email = ?';
            conn.query(checkEmailQuery, [email], (err, result) => {
                if (err) {
                    console.error('Error al verificar el correo en la base de datos:', err);
                    return res.status(500).send({ success: false, message: 'Error al verificar el correo en la base de datos.' });
                }

                if (result.length > 0) {
                    return res.status(400).send({ success: false, message: 'El correo ya está registrado.' });
                }

                bcrypt.hash(contraseña, 10, (err, hashedPassword) => {
                    if (err) {
                        console.error('Error al encriptar la contraseña:', err);
                        return res.status(500).send({ success: false, message: 'Error al encriptar la contraseña.' });
                    }

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

// Ruta para iniciar sesión
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
                    return res.status(200).json({ success: true, userName: user.nombres });
                } else {
                    return res.status(500).send({ success: false, message: 'Sesión no disponible.' });
                }
            } else {
                return res.status(400).send({ success: false, message: 'Contraseña incorrecta.' });
            }
        });
    });
});

// Ruta para cerrar sesión
app.post('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error al cerrar sesión:', err);
                return res.status(500).send({ success: false, message: 'Error al cerrar sesión.' });
            }
            res.status(200).send({ success: true });
        });
    } else {
        res.status(400).send({ success: false, message: 'No hay sesión activa.' });
    }
});
// Ruta genérica para manejar 404
app.use((req, res) => {
    res.status(404).send({ success: false, message: 'Ruta no encontrada.' });
});
// Iniciar el servidor
app.listen(app.get('port'), () => {
    console.log(`Server on port`, app.get('port'));
});
