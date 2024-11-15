const express = require('express');
const router = express.Router();

// Cursos
router.get('/cursos-recomendados', (req, res) => {
        req.getConnection((err, connection) => {
                if (err) {
                        return res.status(500).send('Error al conectar a la base de datos');
                }

                const query = `SELECT 
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
})
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
})


module.exports = router;
