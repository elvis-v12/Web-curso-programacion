CREATE TABLE solicitud (
    id_solicitud INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    nombre VARCHAR(100) NOT NULL,
    dni VARCHAR(20) NOT NULL,
    fecha_nacimiento DATE,
    numero_telefono VARCHAR(20),
    email VARCHAR(100),
    sexo VARCHAR(10),
    pais VARCHAR(50),
    departamento VARCHAR(50),
    distrito VARCHAR(50),
    direccion_domiciliaria VARCHAR(200),
    codigo_postal VARCHAR(10),
    referencia VARCHAR(200),
    estado VARCHAR(20),
    
    CONSTRAINT fk_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES usuario(id_usuario)
);
