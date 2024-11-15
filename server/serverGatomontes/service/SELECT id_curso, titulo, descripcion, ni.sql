SELECT
(pc.progreso/c.duracion)*100 AS 'progreso',
c.titulo,
c.descripcion,
c.portada
FROM webcursos.usuario u
JOIN webcursos.progreso_curso pc ON u.id_usuario = pc.id_usuario
JOIN webcursos.cursos c ON c.id_curso = pc.id_curso