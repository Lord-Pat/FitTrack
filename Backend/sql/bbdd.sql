DROP DATABASE IF EXISTS fittrack;

CREATE DATABASE fittrack;

Use fittrack;

CREATE TABLE usuarios(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    email VARCHAR(100) NOT NULL UNIQUE,
    psswd VARCHAR(255) NOT NULL
);

CREATE TABLE ejercicios(
id INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(255),
descripcion TEXT,
grupo_muscular VARCHAR(50),
url_img TEXT
);

CREATE TABLE rutinas(
id INT AUTO_INCREMENT PRIMARY KEY,
rutina_id INT NOT NULL, -- relacion con la rutina
ejercicio_id INT NOT NULL, -- relacion con el ejercicio
repeticiones INT,
series INT,
descanso_segundos INT,
orden INT,  -- para mostrar los ejercicios en orden

FOREIGN KEY (rutina_id) REFERENCES rutinas(id) ON DELETE CASCADE,
FOREIGN KEY (ejercicio_id) REFERENCES ejercicios(id)
);

CREATE TABLE amistades (
id INT AUTO_INCREMENT PRIMARY KEY,
usuario_id INT NOT NULL,
amigo_id INT NOT NULL,
mote VARCHAR(100),

estado ENUM('Pendiente','Aceptado', 'Rechazado'),
fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
FOREIGN KEY (amigo_id) REFERENCES usuarios(id),
UNIQUE(usuario_id, amigo_id)
);

CREATE TABLE mensajes (
id INT AUTO_INCREMENT PRIMARY KEY,
emisor_id INT NOT NULL,
receptor_id INT NOT NULL,
mensaje TEXT NOT NULL,
fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

FOREIGN KEY (emisor_id) REFERENCES usuarios(id),
FOREIGN KEY (receptor_id) REFERENCES usuarios(id)
);

CREATE TABLE progreso_usuario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  fecha DATE NOT NULL,
  peso_corporal DECIMAL(5,2),
  observaciones TEXT,

  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
