const express = require('express');
const router = express.Router();

// Cursos
router.get('/cursos', (req, res) => {
    req.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error al conectar a la base de datos');
        }

        const query = `SELECT *
                    FROM webcursos.cursos c
                    WHERE c.id_curso = ${req.query.code}
                    `;

        connection.query(query, (err, resultados) => {
            if (err) {
                return res.status(500).send('Error al obtener los cursos');
            }
            res.send(resultados[0]);
        });
    });
});

router.get('/cursos-recomendados', (req, res) => {
    req.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error al conectar a la base de datos');
        }

        const query = `SELECT 
                        c.id_curso,
                        c.precio,
                        c.idioma,
                        c.titulo,
                        c.rating,
                        c.portada,
                        p.nombre_completo
                    FROM webcursos.cursos c
                    JOIN webcursos.profesor p ON c.id_profesor = p.id_profesor 
                    WHERE c.recomendado = 1
                    `;

        connection.query(query, (err, resultados) => {
            if (err) {
                return res.status(500).send('Error al obtener los cursos');
            }
            res.send(resultados);
        });
    });
});

router.get('/cursos-mejores', (req, res) => {
    req.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error al conectar a la base de datos');
        }

        const query = `
                SELECT 
                    c.titulo,
                    c.rating,
                    c.portada,
                    p.nombre_completo
                FROM webcursos.cursos c
                JOIN webcursos.profesor p ON c.id_profesor = p.id_profesor 
                ORDER BY c.rating DESC
                LIMIT 6
                `;

        connection.query(query, (err, resultados) => {
            if (err) {
                return res.status(500).send('Error al obtener los cursos');
            }
            res.send(resultados);
        });
    });
});

router.get('/cursos-recientes', (req, res) => {
    req.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error al conectar a la base de datos');
        }

        const query = `
                SELECT 
                    c.titulo,
                    c.rating,
                    c.portada,
                    c.fecha_creacion,
                    p.nombre_completo
                FROM webcursos.cursos c
                JOIN webcursos.profesor p ON c.id_profesor = p.id_profesor 
                ORDER BY c.fecha_creacion DESC
                LIMIT 5
            `;

        connection.query(query, (err, resultados) => {
            if (err) {
                return res.status(500).send('Error al obtener los cursos');
            }
            res.send(resultados);
        });
    });
});

router.put('/cursos-save', (req, res) => {
    const curso = req.body;

    // Validar que los datos básicos estén presentes
    if (!curso.id_curso || !curso.titulo || !curso.descripcion) {
        return res.status(400).json({
            error: 'Faltan datos obligatorios: '
        });
    }

    req.getConnection((err, connection) => {
        if (err) {
            console.error('Error al conectar a la base de datos:', err);
            return res.status(500).json({ error: 'Error al conectar a la base de datos' });
        }

        const query = `
            UPDATE webcursos.cursos
            SET titulo = ?, descripcion = ?, nivel = ?, precio = ?, fecha_creacion = ?, duracion = ?, id_profesor = ?, id_categoria = ?, estado = ?, rating = ?, portada = ?, recomendado = ?, idRuta = ?, idioma = ?, resumen = ?
            WHERE id_curso = ?
        `;

        const values = [
            curso.titulo,
            curso.descripcion,
            curso.nivel,
            curso.precio,
            curso.fecha_creacion,
            curso.duracion,
            curso.id_profesor,
            curso.id_categoria,
            curso.estado,
            curso.rating,
            curso.portada,
            curso.recomendado,
            curso.idRuta,
            curso.idioma,
            curso.resumen,
            curso.id_curso
        ];


        connection.query(query, values, (err, result) => {
            if (err) {
                console.error('Error al ejecutar la consulta:', err);
                return res.status(500).json({ error: 'Error al ejecutar la consulta' + err });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Curso no encontrado' });
            }

            res.json({ message: 'Curso actualizado exitosamente' });
        });
    });
});

// Progreso de Usuario
router.get('/cursos-incompletos', (req, res) => {
    req.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error al conectar a la base de datos');
        }
        let idUser = req.query.user;
        let query = `
                SELECT
                    FORMAT((pc.progreso / c.duracion) * 100, 2, 2) AS 'progreso',
                    c.titulo,
                    c.descripcion,
                    c.portada,
                    c.rating
                FROM webcursos.usuario u
                JOIN webcursos.progreso_curso pc ON u.id_usuario = pc.id_usuario
                JOIN webcursos.cursos c ON c.id_curso = pc.id_curso
                WHERE u.id_usuario =${idUser}  AND pc.progreso != c.duracion;
                `
        connection.query(query, (err, resultados) => {
            if (err) {
                return res.status(500).send('Error al obtener los cursos');
            }
            res.send(resultados);
        });

    })
});

router.get('/cursos-completos', (req, res) => {
    req.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error al conectar a la base de datos');
        }
        let idUser = req.query.user;
        let query = `
                SELECT
                    pc.nota,
                    (pc.nota/20)*100 AS 'porcentaje',
                    c.titulo,
                    c.descripcion,
                    c.portada,
                    c.rating
                FROM webcursos.usuario u
                JOIN webcursos.progreso_curso pc ON u.id_usuario = pc.id_usuario
                JOIN webcursos.cursos c ON c.id_curso = pc.id_curso
                WHERE u.id_usuario = ${idUser} AND pc.progreso = c.duracion;
                `
        connection.query(query, (err, resultados) => {
            if (err) {
                return res.status(500).send('Error al obtener los cursos');
            }
            res.send(resultados);
        });

    })
});

//rutas
router.get('/ruta-crear', (req, res) => {
    req.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error al conectar a la base de datos');
        }
        const query = `INSERT INTO webcursos.ruta(name) VALUE (?);`;
        connection.query(query, [req.query.name], (err, resultados) => {
            if (err) {
                return res.status(500).send('Error al crear la ruta: ' + err);
            }
            res.send("Se creó la ruta");
        });
    });
});

//solicitud
router.post('/solicitud-save', (req, res) => {
    const solicitud = req.body;

    // Validar que los datos obligatorios estén presentes
    if (!solicitud.id_usuario || !solicitud.nombre || !solicitud.dni) {
        return res.status(400).json({
            error: 'Faltan datos obligatorios: id_usuario, nombre, dni'
        });
    }

    req.getConnection((err, connection) => {
        if (err) {
            console.error('Error al conectar a la base de datos:', err);
            return res.status(500).json({ error: 'Error al conectar a la base de datos' });
        }

        const query = `
            INSERT INTO solicitud (
                id_usuario, nombre, dni, fecha_nacimiento, numero_telefono, email, sexo, pais, departamento, distrito, direccion_domiciliaria, codigo_postal, referencia, estado
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            solicitud.id_usuario,
            solicitud.nombre,
            solicitud.dni,
            solicitud.fecha_nacimiento,
            solicitud.numero_telefono,
            solicitud.email,
            solicitud.sexo,
            solicitud.pais,
            solicitud.departamento,
            solicitud.distrito,
            solicitud.direccion_domiciliaria,
            solicitud.codigo_postal,
            solicitud.referencia,
            solicitud.estado
        ];

        connection.query(query, values, (err, result) => {
            if (err) {
                console.error('Error al ejecutar la consulta:', err);
                return res.status(500).json({ error: 'Error al ejecutar la consulta' });
            }

            res.json({ message: 'Solicitud guardada exitosamente', id_solicitud: result.insertId });
        });
    });
});

router.get('/solicitud-estado/:id_usuario', (req, res) => {
    const id_usuario = req.params.id_usuario;

    req.getConnection((err, connection) => {
        if (err) {
            console.error('Error al conectar a la base de datos:', err);
            return res.status(500).json({ error: 'Error al conectar a la base de datos' });
        }

        const query = `
            SELECT estado, fecha
            FROM solicitud
            WHERE id_usuario = ?
            LIMIT 1
        `;

        connection.query(query, [id_usuario], (err, results) => {
            if (err) {
                console.error('Error al ejecutar la consulta:', err);
                return res.status(500).json({ error: 'Error al ejecutar la consulta' });
            }

            if (results.length === 0) {
                return res.status(404).json({ error: 'Solicitud no encontrada' });
            }

            res.json({ estado: results[0].estado });
        });
    });
});

router.post('/solicitud-check', (req, res) => {
    const { id_usuario } = req.body;

    if (!id_usuario) {
        return res.status(400).json({ error: 'Falta el ID del usuario' });
    }

    req.getConnection((err, connection) => {
        if (err) {
            console.error('Error al conectar a la base de datos:', err);
            return res.status(500).json({ error: 'Error al conectar a la base de datos' });
        }

        const query = `
            SELECT id_solicitud
            FROM solicitud
            WHERE id_usuario = ? AND estado = 'En espera'
        `;

        connection.query(query, [id_usuario], (err, results) => {
            if (err) {
                console.error('Error al ejecutar la consulta:', err);
                return res.status(500).json({ error: 'Error al ejecutar la consulta' });
            }

            res.json({ hasSolicitud: results.length > 0 });
        });
    });
});

module.exports = router;
